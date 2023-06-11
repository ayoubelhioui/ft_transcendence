import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Channel, User } from "src/database/entities";
import { ChannelUserRole } from "../types/channel-user-roles";


@Injectable()
export class ChannelRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requestedRoles = this.reflector.getAllAndOverride<ChannelUserRole[]>('channelRoles', [context.getHandler(), context.getClass()]);
    if (!requestedRoles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const userRoleInChannel : ChannelUserRole = request.userRoleInChannel;

    // console.log(`usrRole === ${userRoleInChannel}`)
    // for (let i = 0; i < requestedRoles.length; i++)
    //   console.log(`requestedRole === ${requestedRoles[0]}`);
    return this.validateRoles(requestedRoles, userRoleInChannel);
  }

  private validateRoles(requestedRoles: ChannelUserRole[], userChannelRoles: ChannelUserRole) {
    return (requestedRoles.includes(userChannelRoles));
  }
}