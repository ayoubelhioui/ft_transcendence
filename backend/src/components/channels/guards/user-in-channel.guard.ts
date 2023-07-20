import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, mixin, Param } from '@nestjs/common';
import { Channel, ChannelUsers, User } from "src/database/entities";
import { IChannelUsersRepository } from "src/components/repositories/repositories_interfaces";
import { Reflector } from "@nestjs/core";
import { UserService } from '../../user/user.service';


@Injectable()
export class UserInChannelGuard implements CanActivate {
    constructor(
        @Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository,
        private reflector: Reflector
        ) {};

    private async isUserInChannel(user : User , channel : Channel) : Promise <ChannelUsers> {
        const userInChannel : ChannelUsers | undefined  = await this.channelUsersRepository.isUserInChannel(user, channel);
        if (!userInChannel)
            throw  new NotFoundException('User Not exist In Channel');
        return (userInChannel);
    }
    async canActivate(context: ExecutionContext): Promise <boolean> {
        const isSocket = this.reflector.getAllAndOverride<boolean>('isSocket', [context.getHandler(), context.getClass()]);
        let request;
        if (isSocket)
            request = context.switchToWs().getClient();
        else
            request = context.switchToHttp().getRequest();
        
        const channel  : Channel = request.channel;
        const user     : User =    request.user;

        const userInChannel : ChannelUsers  = await this.isUserInChannel(user, channel);
        request.channelUser = userInChannel;
        request.userRole = userInChannel.userRole;
        return (true);
    }
}