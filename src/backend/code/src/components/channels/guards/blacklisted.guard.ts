import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ChannelService } from '../channel.service';
import { Channel, User } from "src/database/entities";


@Injectable()
export class BlacklistedGuard implements CanActivate {
    constructor(private readonly channelService : ChannelService) {};
    async canActivate(context: ExecutionContext): Promise < boolean> {
        const request = context.switchToHttp().getRequest();
    
        const user : User = request.user;
        const channel : Channel = request.channel;
        await this.channelService.isUserBlacklisted(user, channel);
        return true;
    }
}