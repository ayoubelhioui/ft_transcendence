import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { User } from 'src/database/entities';
import { GetUser } from '../user/decorators/user.decorator';
import { TargetUserExistGuard } from '../user/guards/target-user-exists.guard';
import { GetTargetedUser } from '../channels/decorators';
import { IsFriendGuard } from './guards/is-friend.guard';
import { TokenValidationGuard } from '../auth/guards/acces-token.guard';
import { friendRequestStatus } from 'src/global/types';

@Controller('users/me/friends')
// @UseGuards(TokenValidationGuard)
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}
    @Get()
    async getFriends(@GetUser() user : User){
        return await this.friendsService.getFriends(user);
    };



    @Delete(':targetUserId/block')
    @UseGuards(TargetUserExistGuard)
    async blockFriend(@GetUser() user : User, @GetTargetedUser() userToBlock : User){
        return await this.friendsService.blockFriend(user,userToBlock);
    };

    @Delete(':targetUserId/unblock')
    @UseGuards(TargetUserExistGuard)
    async unblockFriend(@GetUser() user : User, @GetTargetedUser() userToUnblock : User){
        return await this.friendsService.unblockFriend(user,userToUnblock);
    };

    @Delete(':targetUserId')
    @UseGuards(TargetUserExistGuard, IsFriendGuard)
    async deleteFriend(@GetUser() user : User, @GetTargetedUser() userToDelete : User){
        return await this.friendsService.deleteFriend(user, userToDelete)
    };
    
    @Get(":targetUserId/status")
    @UseGuards(TargetUserExistGuard)
    async getUserToUserStatus(@GetUser() user : User, @GetTargetedUser() relatedUser : User)
    {
        const is_friend = await this.friendsService.friendStatus(user,relatedUser);
        const blocking = await this.friendsService.blocking_relationship(user,relatedUser);
        // const 
        if (is_friend) {
            return {
                userId : user.id,
                targetUserId : relatedUser.id,
                status : is_friend.status, //block
                sender : is_friend.sender,
                receiver : is_friend.receiver,
                channel : is_friend.channel,
                blocked : blocking? blocking.blocked : null,
                blockedBy : blocking? blocking.blockedBy : null,
            }
        } else {
            return {
                userId : user.id,
                targetUserId : relatedUser.id,
                status : -1,
                sender : undefined,
                receiver : undefined,
                channel : undefined,
                blocked : blocking? blocking.blocked : null,
                blockedBy : blocking? blocking.blockedBy : null,
            }
        }
    }
}
