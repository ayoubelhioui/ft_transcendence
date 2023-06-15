import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ChannelService } from '../channel.service';
import { Channel, User } from "src/database/entities";
import { channel } from 'diagnostics_channel';


@Injectable()
export class GroupGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise < boolean> {
        const request = context.switchToHttp().getRequest();
        const channel : Channel = request.channel;
        return (channel.isGroup);
    }
}