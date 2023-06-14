import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, mixin, Param, BadRequestException } from '@nestjs/common';
import { Channel, ChannelUsers, User } from "src/database/entities";
import { IChannelUsersRepository } from "src/components/repositories/repositories_interfaces";
import { Reflector } from "@nestjs/core";
import { UserService } from '../../user/user.service';


@Injectable()
export class TargetedUserNotInChannelGuard implements CanActivate {
    constructor(@Inject('MyChannelUsersRepository') private readonly channelUsersRepository: IChannelUsersRepository,
                private readonly userService : UserService,
    ) {};

    private async isUserNotInChannel(user : User , channel : Channel) : Promise <boolean> {
        const userInChannel : ChannelUsers | undefined  = await this.channelUsersRepository.isUserInChannel(user, channel);
        if (userInChannel)
            throw  new NotFoundException('User already  exist In Channel');
        return (true);
    }
    async canActivate(context: ExecutionContext): Promise <boolean> {

        const request = context.switchToHttp().getRequest();
        const channel  : Channel = request.channel;
        const targetUserId : number = parseInt(request.params.targetUserId);
        if (isNaN(targetUserId))
            throw new BadRequestException("the Targeted UserId Must be a Number");
        const targetedUser : User = await this.userService.findUserById(targetUserId);
        request.targetedUser = targetedUser;
        return  await this.isUserNotInChannel(targetedUser, channel);
    }
}