import { ChannelUserRole } from "src/global/types/channel-user-roles";
import { IsEnum } from 'class-validator';

enum allowedChangedRole {
    member,
    admin
}

export class ChangeMemberRoleDto {

    @IsEnum(allowedChangedRole)
    userRole : ChannelUserRole;
}