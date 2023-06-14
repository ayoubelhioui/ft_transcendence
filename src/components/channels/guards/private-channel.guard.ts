import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Channel } from "src/database/entities";
import { ChannelUserRole } from "../../../global/types/channel-user-roles";
import { channel } from 'diagnostics_channel';
import { ChannelsVisibility } from "src/global/types/channel-visibility.type";


@Injectable()
export class PrivateChannelGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const channel : Channel = request.channel;
    return (channel.visibility != ChannelsVisibility.private);
  }

  private validateRoles(requestedRoles: ChannelUserRole[], userChannelRoles: ChannelUserRole) {
    return (requestedRoles.includes(userChannelRoles));
  }
}