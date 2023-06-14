import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ChannelService } from '../channel.service';
import { Channel } from "src/database/entities";
import { channel } from 'diagnostics_channel';


@Injectable()
export class ChannelExistsGuard implements CanActivate {
    constructor(private readonly channelService : ChannelService) {};
    async canActivate(context: ExecutionContext): Promise < boolean> {
        const request = context.switchToHttp().getRequest();
        const channelId : number = parseInt(request.params.id);
        if (isNaN(channelId))
            throw new BadRequestException("the Channel Id Must be a Number");
        const channel : Channel | undefined = await this.channelService.getChannelById(channelId);
        if (!channel)
            throw  new NotFoundException('Channel Not Found');
        request.channel = channel;
        return true;
    }
}