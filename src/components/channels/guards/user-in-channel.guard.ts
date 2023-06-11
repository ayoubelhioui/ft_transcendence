import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { ChannelUsersService } from "../channel-users.service";


@Injectable()
export class UserInChannelGuard implements CanActivate {
    constructor(private readonly channelUserService : ChannelUsersService) {};
    async canActivate(context: ExecutionContext): Promise <boolean> {
        const request = context.switchToHttp().getRequest();
        const channel  : Channel = request.channel;
        const user     : User = request.user;

        const userInChannel : ChannelUsers | undefined  = await this.channelUserService.isUserInChannel(user, channel);
        console.log("user In Channel  === ")
        console.log(userInChannel);
        if (!userInChannel)
            throw  new NotFoundException('User Not exist In Channel');
        request.userRoleInChannel = userInChannel.userRole;
        return (true);
    }
}