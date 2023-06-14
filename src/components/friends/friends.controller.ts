import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { User } from 'src/database/entities';
import { GetUser } from '../user/decorators/user.decorator';

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
