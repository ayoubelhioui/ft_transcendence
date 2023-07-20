import { Controller, Delete, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ChannelUserRole } from 'src/global/types/channel-user-roles';
import { ChannelRolesGuard, UserInChannelGuard, GroupGuard , ChannelExistsGuard, TargetedUserNotInChannelGuard ,
        UserNotInChannelGuard, BlacklistedGuard} from '../channels/guards';
import { Channel, User } from 'src/database/entities';
import { GetUser } from '../user/decorators/user.decorator';
import { ChannelRoles, GetTargetedUser, GetChannel } from '../channels/decorators';
import { GroupInvitesService } from './group_invites.service';

@Controller('channels/:id/invite')
export class GroupInvitesController {

    constructor(private readonly groupInvitesService: GroupInvitesService) {}

    /*
        me owner of group

    */

    //localhost:3000/channels/:id/invite/111112
    @Post(':token/accept')
    @UseGuards(ChannelExistsGuard, UserNotInChannelGuard, BlacklistedGuard)
    async acceptInvite(@GetUser() user : User, @GetChannel() channel : Channel,@Param('token', ParseUUIDPipe) token : string){
        await this.groupInvitesService.acceptInvite(user, channel, token);
        return ({
            message : "You Joined Channel successfully"
        })
    };


    @Delete(':token/refuse')
    @UseGuards(ChannelExistsGuard, UserNotInChannelGuard, BlacklistedGuard)
    async refuseInvite(@GetUser() user : User, @GetChannel() channel : Channel,@Param('token', ParseUUIDPipe) token : string){
        await this.groupInvitesService.refuseInvite(user, channel, token);
        return ({
            message : "You refuses Invite successfully"
        })
    };


    @Post(':targetUserId')
    @ChannelRoles(ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard,ChannelRolesGuard, TargetedUserNotInChannelGuard)
    async inviteToGroup(@GetUser() user : User ,@GetTargetedUser() targetedUser : User, @GetChannel() channel : Channel) {
        await this.groupInvitesService.inviteToGroup(user, targetedUser, channel);
        return ({
            message : "invitations done successfully"
        })
    }
}
