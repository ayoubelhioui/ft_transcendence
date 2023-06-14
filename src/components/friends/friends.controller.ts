import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { GetUser } from 'src/global/decorators/default-user.decorator';
import { User } from 'src/database/entities';

@Controller('users/me/friends')
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}
    @Get()
    async getFriends(@GetUser() user : User){
        this.friendsService.getFriends(user);
    };

    @Delete(':id')
    deleteFriend(@GetUser() user : User){

    };

    @Delete(':id/block')
    blockFriend(){};
}
