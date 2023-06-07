import { Controller, Delete, Post } from '@nestjs/common';

@Controller('users/me/group-invites')
export class GroupInvitesController {

    /*
        me owner of group

    */
    @Post(':groupId/:userId')
    inviteToGroup(){};


    @Delete(':inviteToken/accept')
    acceptInvite(){};

    @Delete(':inviteToken/refuse')
    refuseInvite(){};

}
