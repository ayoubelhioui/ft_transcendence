import { Controller, Delete, Post, Put } from '@nestjs/common';

@Controller('users/me/friend-requests')
export class FriendRequestsController {

    @Post(':userId')
    requestFriend(){};//if not blocked

    @Put(':id')
    acceptFriend(){};

    @Delete(':id')
    refuseFriend(){};

}
