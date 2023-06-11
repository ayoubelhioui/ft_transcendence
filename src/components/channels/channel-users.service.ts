import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Channel, User, ChannelUsers } from 'src/database/entities';

import { IChannelUsersRepository } from '../repositories/repositories_interfaces';
import { ChannelUserRole } from './types/channel-user-roles';


@Injectable()
export class ChannelUsersService {

    constructor(@Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository) {}

    async isUserInChannel(user : User, channel : Channel) : Promise < ChannelUsers | undefined > {
        return (this.channelUsersRepository.isUserInChannel(user, channel));
    }

    async addUserToChannel(user : User, channel : Channel, role : ChannelUserRole =  ChannelUserRole.member) : Promise <ChannelUsers | undefined>
    {
        return (this.channelUsersRepository.addUserToChannel(user, channel, role));
    }

}




