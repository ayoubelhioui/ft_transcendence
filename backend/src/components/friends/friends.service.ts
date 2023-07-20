import { Inject, Injectable, NotFoundException, UnauthorizedException, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BlockedUsers, Friends, User } from 'src/database/entities';
// import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';
import { IBlockedUsersRepository, IFriendsRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { friendRequestStatus } from 'src/global/types';
import { DeleteResult } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { ChannelService } from '../channels/channel.service';
import { FriendsGateway } from './friends.gateway';



/**TODO
 * make guards that checks if targetted user exists then swap all to it
 */
@Injectable()
export class FriendsService {

    constructor(
        @Inject("MyFriendsRepository") private readonly friendsRepository : IFriendsRepository,
        @Inject("MyBlockedUsersRepository") private readonly blockedUsersRepository : IBlockedUsersRepository,
        private readonly channelService : ChannelService,
        private readonly notificationService : NotificationService,
        private readonly friendsGateway: FriendsGateway
        ){}

    
    async getFriends(user  : User) : Promise <User[]>
    {
         
        const users = await this.friendsRepository.getFriendsOfId(user);
        return users;
    };


    //only user if both users exists
    async is_blocked_by(blocked  : User, blockedBy  : User) : Promise<boolean>
    {
        const result : BlockedUsers[] = await this.blockedUsersRepository.findByOptions(
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
        const result : BlockedUsers[] = await this.blockedUsersRepository.findByOptions(
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

    async blocking_relationship(blocked  : User, blockedBy  : User)
    {
        const result = await this.blockedUsersRepository.findOneByOptions(
            {
                where : [
                    {
                        blocked, blockedBy
                    },
                    {
                        blocked : blockedBy,
                        blockedBy : blocked
                    }
            ], relations: ["blockedBy", "blocked"]
            }
        )
        return (result)
    }

    async getFriendRequests(user  : User) : Promise <Friends[] | undefined>
    {
        return this.friendsRepository.getFriendRequestOfId(user);
    }
    // getOnlineFriends(userId  : number){}; sockets?


    //both users exist guard
    async requestFriend(Sender: User, receiver: User) {
        // const receiver: User | undefined = await this.userRepository.findOneById(ReceiverId);
        // if (!receiver)
        // throw new NotFoundException("This user doesn't exist");
        
        const is_blocked = await this.is_blocked_by(Sender, receiver);
        if (is_blocked)
        throw new UnauthorizedException('You are blocked and cannot perform this action.');
        
        // await this.unblockFriend(Sender,receiver)
        if(receiver.id == Sender.id){

             throw new HttpException("You can't send friend request to yourself yourself",HttpStatus.BAD_REQUEST);
        } 

        let existingRequest : Friends = await this.friendsRepository.findOneByOptions({
                where: [
                            {
                                sender: Sender,
                                receiver : receiver,
                            },
                            {
                                sender: receiver,
                                receiver: Sender,
                            }
                        ], relations : ["sender" , "receiver"]
            }
        );
        
        if (existingRequest) {
            if(existingRequest.status === friendRequestStatus.accepted)
            {
                return(
                    {
                        message: `You're already friends`,
                        friendRequest: existingRequest,
                    });
            }
            if(existingRequest.receiver.id == Sender.id)
            {
            existingRequest.status = friendRequestStatus.accepted;
            existingRequest.accepted_time = new Date();
            existingRequest.channel = await this.channelService.createDmChannel(Sender,receiver,`${Sender.username} - ${receiver.username} DM`);
            const notificationInfos = {
                message : `You guys has accepted your friend requests`, 
            }
            await  Promise.all([
                this.friendsRepository.save(existingRequest),
                this.notificationService.createNotification(notificationInfos,receiver, Sender),
                this.notificationService.createNotification(notificationInfos,Sender, receiver),
                this.friendsGateway.new_friends_connect(Sender,receiver)
            ])
                return(
                {
                    message: 'Friend request accepted',
                    friendRequest: existingRequest,
                });
            }
            else if(existingRequest.sender.id == Sender.id)
            {
                return {
                    message: 'You already sent a request',
                    friendRequest: existingRequest,
                  };
            }
        } else {
            existingRequest  = await this.friendsRepository.create({
            status: friendRequestStatus.pending,
            request_time: new Date(),
            accepted_time: null,
            sender: Sender,
            receiver: receiver,
        });
        //notification
        const notificationInfos = {
            message : `${Sender.username} sent you a friend request`, 
            acceptLink : `users/me/friend-requests/${Sender.id}`,
            refuseLink : `users/me/friend-requests/${Sender.id}`
        }
        await this.notificationService.createNotification(notificationInfos,Sender, receiver);
        }
        return {
            message: 'Friend request sent',
            friendRequest: existingRequest,
          };
    };
    
    //both users exist guard
    async acceptFriend(user  : User, sender  : User)
    {
        //no need to check if blocked, cus if so then a friendrequest wouldnt be existing on the table

        const existingRequest : Friends | undefined = await this.friendsRepository.findOneByOptions({
            where: [
                        {
                            sender: sender,
                            receiver: user,
                        }
                    ]
            });
        const notificationInfos = {
            message : `${user.username} has accepted your friend request`, 
        }
        
        if(existingRequest)
        {
            existingRequest.status = friendRequestStatus.accepted;
            existingRequest.accepted_time = new Date();
            existingRequest.channel = await this.channelService.createDmChannel(user , sender ,`${sender.username} - ${user.username} DM`);
            await Promise.all([this.friendsRepository.save(existingRequest),
                this.notificationService.createNotification(notificationInfos,user, sender),
                this.friendsGateway.new_friends_connect(user,sender)
            ]
            );
            return {
                message : `friend request from ${sender.username} has been accepted`
    
               }
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
        const affectedRows = await this.friendsRepository.deleteFriend(user,friend)
        if(affectedRows)
            await this.friendsGateway.old_friends_disconnect(user,friend)
        return ({
            message : affectedRows ?"friend deleted" : "delete failure",
            deletedRows : affectedRows ? affectedRows : 0,
        })
    };

    //users exists Guard
    async refuseFriend(user  : User, sender  : User)
    {
        const existingRequest : Friends | undefined = await this.friendsRepository.findOneByOptions({
            where: [
                        // {
                        //     sender: Sender,
                        //     receiver : receiver,
                        //     status : friendRequestStatus.pending
                        // },
                        {
                            sender: sender,
                            receiver: user,
                            status : friendRequestStatus.pending
                        }
                    ]
            });
        if(existingRequest)
        {
           await this.friendsRepository.remove(existingRequest);
           return {
            message : `friend request from ${sender.username} has been refused`

           }
        } else {
            throw new NotFoundException("Friendrequest invalid")
        }
    };


    //if both users exist guard
    async blockFriend(blockedBy  : User, blocked  : User): Promise<BlockedUsers | { message: string;} >
    {
        // delete friendship or friendrequests
        if(await this.blocking_exists(blocked,blockedBy))
            return { message : "already blocked"}
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

    async isFriend (user  : User, friend: User) : Promise<boolean> {

        const res : Friends[] | undefined = await this.friendsRepository.findByOptions({
            where :[
                {
                    sender: user,
                    receiver : friend,
                    status:  friendRequestStatus.accepted
                },
                {
                    sender: friend,
                    receiver : user,
                    status:  friendRequestStatus.accepted
                }
            ]
        })
        return (res.length > 0)
    };


}
