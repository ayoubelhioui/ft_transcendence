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
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ChannelUsersService } from './channel-users.service';


@Injectable()
export class ChannelService {

    constructor(@Inject('MyChannelRepository') private readonly channelRepository: IChannelRepository,
                private readonly ChannelUsersService: ChannelUsersService,
                private readonly passwordService: PasswordService) {}

    async getChannelById(channelId : number) : Promise <Channel | undefined> {
        return (this.channelRepository.findOneById(channelId));
    }

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
        await this.ChannelUsersService.addUserToChannel(user, channel, ChannelUserRole.owner);
        return (plainToClass(ReturnedChannelDto, createdChannel));
    };


    // get 30 message  of a channel  before this date if given
    //note : date should be in a microsecond
    async getChannelMessages(idUser : number, date? : Date){};


    async getMyChannels(owner : User) :  Promise < Channel[] | undefined > {
        return (this.channelRepository.getOwnerChannels(owner));
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


    async joinChannel(user : User, channel : Channel) {
        return (this.ChannelUsersService.addUserToChannel(user, channel));
    };



    async changeMemberRole(){};


    async  kickMember(){};

    async  blockMember(){};


    async  muteMember(){};

    //if it owner set owner to the first user in channel
    //if the channel is empty just delete it
    async leaveChannel() {

    };

    //if not muted
    async sendMessage(channeliD: number, message : any){};

}




