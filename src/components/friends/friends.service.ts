import { Inject, Injectable, NotFoundException, UnauthorizedException, Delete } from '@nestjs/common';
import { BlockedUsers, Friends, User } from 'src/database/entities';
// import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';
import { IBlockedUsersRepository, IFriendsRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { friendRequestStatus } from 'src/global/types';
import { DeleteResult } from 'typeorm';



/**TODO
 * make guards that checks if targetted user exists then swap all to it
 */
@Injectable()
export class FriendsService {

    constructor(
        @Inject("FriendsRepository") private readonly friendsRepository : IFriendsRepository,
        @Inject("UserRepository") private readonly userRepository : IUserRepository,
        @Inject("BlockedUsersRepository") private readonly blockedUsersRepository : IBlockedUsersRepository,
        ){}


    async getFriends(user  : User) : Promise <Friends[] | undefined>
    {
        return this.friendsRepository.getFriendsOfId(user);
    };


    //only user if both users exists
    async is_blocked_by(blocked  : User, blockedBy  : User) : Promise<boolean>
    {
        const result : BlockedUsers[] = await this.blockedUsersRepository.findByCondition(
            {
                where : {
                    blocked, blockedBy
                }
            }
        )
        return (result.length > 0)
    }

    async blocking_exists(blocked  : User, blockedBy  : User) : Promise<boolean>
    {
        const result : BlockedUsers[] = await this.blockedUsersRepository.findByCondition(
            {
                where : [
                    {
                        blocked, blockedBy
                    },
                    {
                        blocked : blockedBy,
                        blockedBy : blocked
                    }
            ]
            }
        )
        return (result.length > 0)
    }

    async getFriendRequests(user  : User) : Promise <Friends[] | undefined>
    {
        return this.friendsRepository.getFriendRequestOfId(user);
    }
    // getOnlineFriends(userId  : number){}; sockets?


    //both users exist guard
    async requestFriend(Sender: User, ReceiverId: number) {
        const receiver: User | undefined = await this.userRepository.findOneById(ReceiverId);
        if (!receiver)
        throw new NotFoundException("This user doesn't exist");
        
        const is_blocked = await this.is_blocked_by(Sender, receiver);
        if (is_blocked)
        throw new UnauthorizedException('You are blocked and cannot perform this action.');
        
        // await this.unblockFriend(Sender,receiver)


        let existingRequest : Friends = await this.friendsRepository.findOneByCondition({
        where: [
                    {
                        sender: Sender,
                        receiver : receiver,
                    },
                    {
                        sender: receiver,
                        receiver: Sender,
                    }
                ]
        });
        
        if (existingRequest) {
            if(existingRequest.status === friendRequestStatus.accepted)
            return(
                {
                    message: `You're already friends`,
                    friendRequest: existingRequest,
                });
        existingRequest.status = friendRequestStatus.accepted;
        existingRequest.accepted_time = new Date();
        await this.friendsRepository.save(existingRequest);
            return(
            {
                message: 'Friend request accepted',
                friendRequest: existingRequest,
            });
        } else {
            existingRequest  = await this.friendsRepository.create({
            status: friendRequestStatus.pending,
            request_time: new Date(),
            accepted_time: null,
            sender: Sender,
            receiver: receiver,
        });
        }
        return {
            message: 'Friend request sent',
            friendRequest: existingRequest,
          };
    };
    
    //both users exist guard
    async acceptFriend(Sender  : User, ReceiverId  : number)
    {
        //no need to check if blocked, cus if so then a friendrequest wouldnt be existing on the table
        const receiver: User | undefined = await this.userRepository.findOneById(ReceiverId);
        if (!receiver)
        throw new NotFoundException("This user doesn't exist");

        const existingRequest : Friends | undefined = await this.friendsRepository.findOneByCondition({
            where: [
                        {
                            sender: Sender,
                            receiver : receiver,
                        },
                        {
                            sender: receiver,
                            receiver: Sender,
                        }
                    ]
            });
        if(existingRequest)
        {
            existingRequest.status = friendRequestStatus.accepted;
            existingRequest.accepted_time = new Date();
            await this.friendsRepository.save(existingRequest);
        } else {
            throw new NotFoundException("Friendrequest invalid")
        }
    };

    //users exists Guard
    //isFriend Guard // send in row
    //swap to remove when doin guards
    async deleteFriend(user  : User, friend  : User)
    {
        //they already friends
        
        const deleteResult : DeleteResult  = await this.friendsRepository.delete({
            where : [
                {
                    sender: user,
                    receiver : friend,
                },
                {
                    sender: user,
                    receiver: friend,
                }
            ]
        })
        return ({
            message : deleteResult.affected ?"friend deleted" : "delete failure",
            deletedRows : deleteResult.affected ? deleteResult.affected : 0,
        })
    };

    //users exists Guard
    async refuseFriend(Sender  : User, ReceiverId  : number)
    {
        const receiver: User | undefined = await this.userRepository.findOneById(ReceiverId);
        if (!receiver)
        throw new NotFoundException("This user doesn't exist");

        const existingRequest : Friends | undefined = await this.friendsRepository.findOneByCondition({
            where: [
                        {
                            sender: Sender,
                            receiver : receiver,
                        },
                        {
                            sender: receiver,
                            receiver: Sender,
                        }
                    ]
            });
        if(existingRequest)
        {
            await this.friendsRepository.remove(existingRequest);
        } else {
            throw new NotFoundException("Friendrequest invalid")
        }
    };


    //if both users exist guard
    async blockFriend(blockedBy  : User, blocked  : User)
    {
        // delete friendship or friendrequests
        try {
            this.deleteFriend(blockedBy,blocked);
        } catch (error) {
            
        }
        return (
                await this.blockedUsersRepository.create({
                blocked,blockedBy
            })
        )
    };

    //only use if both exists
    //exist guards
    async unblockFriend(blockedBy  : User, blocked  : User)
    {
        //create row of blocker and blocked
       const deleteResult : DeleteResult = await this.blockedUsersRepository.delete({
            blocked,blockedBy
        })
        return (
            {
                message: deleteResult.affected ?"user unblocked" : "unblocking failure",
                affected_rows : deleteResult.affected ? deleteResult.affected : 0,
            }
        )
    };

    async isFriend (userId  : User, friendId: number) : Promise<boolean> {

        const res : Friends[] | undefined = await this.friendsRepository.findByCondition({
            where :[
                {
                    sender: userId,
                    receiver : friendId,
                    status:  friendRequestStatus.accepted
                },
                {
                    sender: friendId,
                    receiver : userId,
                    status:  friendRequestStatus.accepted
                }
            ]
        })
        return (res.length > 0)
    };
}
