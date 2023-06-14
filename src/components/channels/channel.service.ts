import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import IChannelRepository from 'src/components/repositories/repositories_interfaces/channel.repository.interface';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel, User, ChannelUsers, ChannelBlacklist, ChannelMessages, ChannelInvites } from 'src/database/entities';
import { PasswordService } from './password.service';
import { ChannelUserRole } from '../../global/types/channel-user-roles';
import { IChannelUsersRepository, IUsersMutedRepository, IChannelMessagesRepository } from '../repositories/repositories_interfaces';
import { ReturnedChannelDto } from './dto/returned-channel.dto';
import { plainToClass } from 'class-transformer';
import { UpdateChannelDto } from './dto/update-channel.dto';
import IChannelBlacklistRepository from '../repositories/repositories_interfaces/channel-blacklist.repository.interface';
import { ChangeMemberRoleDto } from './dto/change-member-role.dto';
import { MuteMemberDto } from './dto/mute-member.dto';
import { addMinutes } from 'date-fns';
import { JoinChannelDto } from './dto/join-channel.dto';
import { ChannelsVisibility } from 'src/global/types/channel-visibility.type';
import { ChannelWithPassword } from '../../global/dto/channel-with-password.dto';



@Injectable()
export class ChannelService {

    constructor(@Inject('MyChannelRepository') private readonly channelRepository: IChannelRepository,
                @Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository,
                @Inject('MyChannelBlacklistRepository') private readonly channelBlacklistRepository: IChannelBlacklistRepository,
                @Inject('MyUsersMutedRepository') private readonly UsersMutedRepository: IUsersMutedRepository,
                @Inject('MyChannelMessagesRepository') private readonly channelMessagesRepository: IChannelMessagesRepository,
                private readonly passwordService: PasswordService) {}

    async getChannelById(channelId : number) : Promise <Channel | undefined> {
        return (this.channelRepository.findOneById(channelId));
    }

    // get list public / protected groups
    async getChannels() : Promise< Channel[] | undefined > {
        return (this.channelRepository.getChannels());
    };

    addUserToChannel(user : User, channel : Channel, userRole : ChannelUserRole) : Promise<ChannelUsers>  {
        return (this.channelUsersRepository.addUserToChannel(user, channel, userRole));
    };

    async createChannel(user : User, createChannelDto : CreateChannelDto) : 
    Promise < ReturnedChannelDto | undefined > {
        let channel : Channel = new Channel();
        channel = {...channel, ...createChannelDto, owner : user};
        channel.password = await this.passwordService.hashPassword(channel.password);
        let createdChannel : Channel = await this.channelRepository.save(channel);
        await this.addUserToChannel(user, channel, ChannelUserRole.owner);
        return (plainToClass(ReturnedChannelDto, createdChannel));
    };

    async createDmChannel(user1 : User , user2 : User, nameChannel : string) : Promise<Channel | undefined> {
        const createChannelDto : CreateChannelDto = {
            name : nameChannel,
            visibility : ChannelsVisibility.private,
            isGroup : false
        }
        let createdChannel : Channel = await this.channelRepository.create(createChannelDto);
        await Promise.all([
            this.addUserToChannel(user1, createdChannel, ChannelUserRole.owner),
            this.addUserToChannel(user2, createdChannel, ChannelUserRole.owner),
        ]);
        return (createdChannel);
    }

    async getMyChannels(user : User) :  Promise < Channel[] | undefined > {
        return (this.channelUsersRepository.getUserChannels(user.id));
    };


    async getChannelUsers(channelId : number) :  Promise < User[] | undefined > {
        return (this.channelUsersRepository.getChannelUsers(channelId));
    };

    
    async deleteChannel(channel : Channel)   {
        await this.channelRepository.remove(channel);
    };

    async updateChannel(channel : Channel, updateChannelDto : UpdateChannelDto) : Promise< ReturnedChannelDto | undefined> {
        if (updateChannelDto.password)
            updateChannelDto.password = await this.passwordService.hashPassword(updateChannelDto.password);
        let updatedChannel : Channel = await this.channelRepository.save({
            ...channel,
            ...updateChannelDto // updated fields
        });
        return (plainToClass(ReturnedChannelDto, updatedChannel));
    };

    async isUserBlacklisted(user : User, channel : Channel) :  Promise<boolean> {
        const isUserBlacklisted = await  this.channelBlacklistRepository.isUserBlacklisted(user, channel);
        if (isUserBlacklisted)
            throw new ForbiddenException("this User is Blocked From this Channel");
        return (false);
    }

    async joinChannel(user : User, channel : Channel, joinChannelDto : JoinChannelDto) : Promise< ChannelUsers > {
        await (this.isUserBlacklisted(user, channel));
        if (channel.visibility == ChannelsVisibility.protected) {
            const channelWithPassword : ChannelWithPassword = await this.channelRepository.getChannelWithPassword(channel.id);
            const isCorrectPassword : boolean  = await this.passwordService.verifyPassword(joinChannelDto.password, channelWithPassword.password);
            if (!isCorrectPassword)
                throw new BadRequestException("Password incorrect!");
        }
        return this.channelUsersRepository.addUserToChannel(user, channel, ChannelUserRole.member);
    };



    async   changeMemberRole (targetedUser: User,
                            channel : Channel,
                            changeMemberRoleDto: ChangeMemberRoleDto) {
        const criteria = {
            user: targetedUser,
            channel
        };
        return this.channelUsersRepository.update(criteria,{
            userRole : changeMemberRoleDto.userRole
        });
    };


    async  kickMember(channelTargetedUser: ChannelUsers) {
        await this.channelUsersRepository.remove(channelTargetedUser);
    };

    async  blockMember(targetedUser : User, channel : Channel) {
        return  Promise.all([
            this.channelBlacklistRepository.create({user : targetedUser, channel}),
            this.channelUsersRepository.delete({user : targetedUser, channel})
        ]);
    };


    async  muteMember(targetedMember : User, channel : Channel, muteMemberDto : MuteMemberDto) {
        const currentDate = new Date(); // Get the current date and time
        const dateMuteExpiration : Date = addMinutes(currentDate, muteMemberDto.muteDurationMinutes);
        return (this.UsersMutedRepository.muteMember(targetedMember, channel, dateMuteExpiration));        
    };

    async  unmuteMember(targetedMember : User, channel : Channel) {
        return (this.UsersMutedRepository.delete({
            user: targetedMember,
            channel
        }));        
    };

    //if it owner set owner to the first user in channel
    //if the channel is empty just delete it
    async leaveChannel(channel : Channel, user  : User, channelUser : ChannelUsers) {
        await this.channelUsersRepository.delete({user , channel});
        const userRole : ChannelUserRole = channelUser.userRole;
        if (userRole == ChannelUserRole.owner) {
            console.log("prev user Id ==== ")
            console.log(user.id);
            const nextOwner = await this.channelUsersRepository.getNextOwner(channel, user.id);
            if (!nextOwner) {
                return (this.deleteChannel(channel));
            }
            channel.owner = nextOwner.user;
            return (Promise.all([
                this.channelUsersRepository.setNextOwner(nextOwner),
                this.channelRepository.save(channel)//update channel owner
                ]));
        }
    };

    // get 30 message  of a channel  before this date if given
    //note : date should be in a microsecond
    async getChannelMessages(channel : Channel, date? : Date) : Promise <ChannelMessages[] | undefined> {
        return (this.channelMessagesRepository.getChannelMessages(channel, date));  
    };


    //if not muted
    async createMessage(user : User, channel : Channel, message : string) : Promise <ChannelMessages | undefined>{
        return (this.channelMessagesRepository.create({
            user,
            channel,
            message
        }));
    };
}



