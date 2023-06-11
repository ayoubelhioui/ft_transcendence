import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { ChannelUsersService } from "../channel-users.service";


@Injectable()
export class UserNotInChannelGuard implements CanActivate {
    constructor(private readonly channelUserService : ChannelUsersService) {};
    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();
        const channel  : Channel = request.channel;
        const user     : User = request.user;

        const userInChannel : ChannelUsers | undefined  = await this.channelUserService.isUserInChannel(user, channel);
        if (userInChannel)
            throw  new BadRequestException('User already In Channel');
        return (true);
    }
}