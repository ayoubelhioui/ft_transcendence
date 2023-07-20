import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Friends, User } from 'src/database/entities';
import { FriendsService } from './friends.service';
import { GetUser } from '../user/decorators/user.decorator';
import { TargetUserExistGuard } from '../user/guards/target-user-exists.guard';
import { GetTargetedUser } from '../user/decorators/targeted-user.decorator';


//user exists guard is for target user
@Controller('users/me/friend-requests')
export class FriendRequestsController {
    constructor(private readonly friendsService: FriendsService) {}
    @Get('')
    async getFriendRequests(@GetUser() user : User) : Promise <Friends[] | undefined>
    {
        return this.friendsService.getFriendRequests(user);
    }

    @Post(':targetUserId')
    @UseGuards(TargetUserExistGuard)
    async requestFriend(@GetUser() sender : User,  @GetTargetedUser() receiver : User){
        return await this.friendsService.requestFriend(sender, receiver)
    };

    @Put(':targetUserId')
    @UseGuards(TargetUserExistGuard)
    async acceptFriend(@GetUser() user : User,  @GetTargetedUser() sender : User){
        return await this.friendsService.acceptFriend(user, sender)
    };

    @Delete(':targetUserId')
    @UseGuards(TargetUserExistGuard)
    async refuseFriend(@GetUser() user : User,  @GetTargetedUser() sender : User){
        return await this.friendsService.refuseFriend(user,sender);
    };

}
