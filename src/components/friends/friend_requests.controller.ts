import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Friends } from 'src/database/entities';
import { FriendsService } from './friends.service';

@Controller('users/me/friend-requests')
export class FriendRequestsController {
    constructor(private readonly friendsService: FriendsService) {}
    @Get('')
    async getFriendRequests(userId  : number) : Promise <Friends[] | undefined>
    {
        return 
    }

    @Post(':userId')
    requestFriend(){};//if not blocked

    @Put(':id')
    acceptFriend(){};

    @Delete(':id')
    refuseFriend(){};

}
