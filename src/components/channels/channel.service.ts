import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import IChannelRepository from 'src/components/repositories/repositories_interfaces/channel.repository.interface';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Channel, User } from 'src/database/entities';
import { PasswordService } from './password.service';
import { UserService } from '../user/user.service';
import { ChannelUserRole } from './types/channel-user-roles';

import { IChannelUsersRepository } from '../repositories/repositories_interfaces';
import { ReturnedChannelDto } from './dto/returned-channel.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ChannelService {

    constructor(@Inject('MyChannelRepository') private readonly channelRepository: IChannelRepository,
                @Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository,
                private readonly userService : UserService,
                private readonly passwordService: PasswordService) {}


    // get list public / protected groups
    async getChannels() : Promise< Channel[] | undefined > {
        return (this.channelRepository.getChannels());
    };

    async createChannel(user : User, createChannelDto : CreateChannelDto) : 
    Promise < ReturnedChannelDto | undefined > {
        let channel : Channel = new Channel();
        channel = {...channel, ...createChannelDto, owner : user};
        channel.password = await this.passwordService.hashPassword(channel.password);
        let createdChannel : Channel = await this.channelRepository.create(channel);
        await this.channelUsersRepository.addUserToChannel(createdChannel, user, ChannelUserRole.owner);
        return (plainToClass(ReturnedChannelDto, createdChannel));
    };


    // get 30 message  of a channel  before this date if given
    //note : date should be in a microsecond
    async getChannelMessages(idUser : number, date? : Date){};


    async getMyChannels(owner : User) :  Promise < Channel[] | undefined > {
        return (this.channelRepository.getOwnerChannels(owner));
    };


    async joinChannel(){};


    
    async deleteChannel(channelId : number,  userId : number)   {
        let channel : Channel = await  this.channelRepository.findOneByIdWithRelations(channelId, ['owner']);
        console.log(channel);
        if (!channel)
            throw  new NotFoundException('Channel Not Found');
        if (channel.owner.id != userId)
            throw  new ForbiddenException("You Are not authorize to delete this channel")
        await this.channelRepository.remove(channel);
    };


    async updateChannel(){

    };


    async changeMemberRole(){};


    async  kickMember(){};

    async blockMember(){};


    async  muteMember(){};

    //if it owner set owner to the first user in channel
    //if the channel is empty just delete it
    async leaveChannel() {

    };

    //if not muted
    async sendMessage(channeliD: number, message : any){};

}




