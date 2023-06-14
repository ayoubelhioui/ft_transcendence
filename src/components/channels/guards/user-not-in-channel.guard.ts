import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Channel, ChannelUsers, User } from "src/database/entities";
import {  IChannelUsersRepository } from "src/components/repositories/repositories_interfaces";


@Injectable()
export class UserNotInChannelGuard implements CanActivate {
    constructor(@Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository) {};
    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();
        const channel  : Channel = request.channel;
        const user     : User = request.user;

        const userInChannel : ChannelUsers | undefined  = await this.channelUsersRepository.isUserInChannel(user, channel);
        if (userInChannel)
            throw  new BadRequestException('User already In Channel');
        return (true);
    }
}