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
        /*
            check if blocked then if friends else noth
        */
       const blocking_relationship = await this.friendsService.blocking_relationship(user,relatedUser);
        if(blocking_relationship)
        { 
            if (blocking_relationship.blocked === user) {
                return {
                    message : `${user.username} blocked by ${relatedUser.username}`,
                    isFriend : undefined,
                    isBlocked : true,
                    isBlockedByMe : false,
                    userId : user.id,
                    targetUserId : relatedUser.id,
                }
            } else {
                return {
                    message : `${relatedUser.username} blocked by ${user.username}`,
                    isFriend : undefined,
                    isBlocked : true,
                    isBlockedByMe : true,
                    userId : user.id,
                    targetUserId : relatedUser.id,
                }
            }
        } else {
            const is_friend = await this.friendsService.friendStatus(user,relatedUser);
            if (is_friend.status === friendRequestStatus.accepted) {
                return {
                    message : "Friends",
                    isFriend : true,
                    isBlocked : undefined,
                    isBlockedByMe : undefined,
                    userId : user.id,
                    targetUserId : relatedUser.id,
                }
            } else {
                return {
                    message : "Not Friends",
                    isFriend : false,
                    isBlocked : undefined,
                    isBlockedByMe : undefined,
                    userId : user.id,
                    targetUserId : relatedUser.id,
                    isPending : is_friend.status == friendRequestStatus.pending ? true : false 
                }
            }
        }
    }
}
