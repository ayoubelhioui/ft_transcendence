import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Channel, User } from "src/database/entities";
import { ChannelUserRole } from "../../../global/types/channel-user-roles";


@Injectable()
export class ChannelRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requestedRoles = this.reflector.getAllAndOverride<ChannelUserRole[]>('channelRoles', [context.getHandler(), context.getClass()]);
    if (!requestedRoles)
      return (false);
    const request = context.switchToHttp().getRequest();
    const userRole : ChannelUserRole = request.userRole;
    const targetedUserRole : ChannelUserRole = request.targetedUserRole;
    const isHaveRequestedRole : Boolean = this.validateRoles(requestedRoles, userRole);
    if (isHaveRequestedRole)
    {
      if (targetedUserRole)
      {
        const userId : number = request.user.id;
        const targetedUserId : number = request.targetedUser.id;
        return (userId != targetedUserId && userRole > targetedUserRole );
      }
      return (true);
    }
    return (false);
  }

  private validateRoles(requestedRoles: ChannelUserRole[], userChannelRoles: ChannelUserRole) {
    return (requestedRoles.includes(userChannelRoles));
  }
}