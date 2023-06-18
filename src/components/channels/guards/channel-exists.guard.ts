import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { ChannelService } from '../channel.service';
import { Channel } from "src/database/entities";
import { channel } from 'diagnostics_channel';
import { Reflector } from "@nestjs/core";
import { IsSocket } from '../../socket/decorators/is-socket.decorator';
import * as request from 'supertest';


@Injectable()
export class ChannelExistsGuard implements CanActivate {

    constructor(
        private readonly channelService : ChannelService,
        private reflector: Reflector
        ) {};
    async canActivate(context: ExecutionContext): Promise < boolean> {
        const isSocket = this.reflector.getAllAndOverride<boolean>('isSocket', [context.getHandler(), context.getClass()]);
        let request;
        let channelId : number; 
        if (isSocket)
        {
            request = context.switchToWs().getClient();
            channelId = context.switchToWs().getData().channelId;
        }
        else
        {
            request = context.switchToHttp().getRequest();
            channelId = parseInt(request.params.id);
        }
        if (isNaN(channelId))
            throw new BadRequestException("the Channel Id Must be a Number");
        const channel : Channel | undefined = await this.channelService.getChannelById(channelId);
        if (!channel)
            throw  new NotFoundException('Channel Not Found');
        request.channel = channel;
        return true;
    }
}