import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('users/me/friends')
export class FriendsController {
    
    @Get()
    getFriends(){};

    @Delete(':id')
    deleteFriend(){};

    @Delete(':id/block')
    blockFriend(){};
}
