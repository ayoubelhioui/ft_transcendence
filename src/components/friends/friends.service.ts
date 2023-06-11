import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Friends, User } from 'src/database/entities';
// import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';
import { IBlockedUsersRepository, IFriendsRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { friendRequestStatus } from 'src/global/types';

@Injectable()
export class FriendsService {

    constructor(
        @Inject("FriendsRepository") private readonly friendsRepository : IFriendsRepository,
        @Inject("UserRepository") private readonly userRepository : IUserRepository,
        @Inject("BlockedUsers") private readonly blockedUsersRepository : IBlockedUsersRepository,
        ){}

    async getFriends(userId  : number) : Promise <Friends[] | undefined>
    {
        //get friends with null on accepted time
        return this.friendsRepository.getFriendsOfId(userId);
    };


    // check if receiver has blocked sender
    async is_blocked(SenderId  : number, ReceiverId  : number) : Promise<boolean>
    {
        //change user entity thing to mutedChannels 
        //bring blocked user entity ig and check (user entity since its many to many with iteself)
        
        return;
    }

    async getFriendRequests(userId  : number) : Promise <Friends[] | undefined>
    {
        return this.friendsRepository.getFriendRequestOfId(userId);
    }
    // getOnlineFriends(userId  : number){}; sockets?

  
    async requestFriend(Sender: User, ReceiverId: number) {
        // Add them with null in accepted time
        const receiver: User | undefined = await this.userRepository.findOneById(ReceiverId);
        if (!receiver)
        throw new NotFoundException("This user doesn't exist");
        
        const is_blocked = await this.is_blocked(Sender.id, ReceiverId);
        if (is_blocked)
        throw new UnauthorizedException('You are blocked and cannot perform this action.');
    
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
        // If request already exists, just accept it by updating the status to 'accept'
        existingRequest.status = friendRequestStatus.accepted;
        existingRequest.accepted_time = new Date();
        await this.friendsRepository.save(existingRequest);
            return(
            {
                message: 'Friend request accepted',
                friendRequest: existingRequest,
            });
        } else {
        // Otherwise, create a new friend request
            existingRequest  = await this.friendsRepository.create({
            status: friendRequestStatus.pending,
            request_time: new Date(),
            accepted_time: null,
            sender: Sender,
            receiver: receiver,
        });
        await this.friendsRepository.save(existingRequest);
        //do I check here if it was created?
        }
        return {
            message: 'Friend request sent',
            friendRequest: existingRequest,
          };
    };
    
    async acceptFriend(Sender  : User, ReceiverId  : number)
    {
        //no need to check if blocked, cus if so then a request wouldnt be existing
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
            await this.userRepository.save(existingRequest);
        } else {
            throw new NotFoundException("Friendrequest invalid")
        }
    };

    async deleteFriend(userId  : number, friendId  : number)
    {

    };

    async refuseFriend(SenderId  : number, ReceiverId  : number)
    {

    };

    async blockFriend(userId  : number, friendId  : number)
    {

    };

    async isFriend (userId  : number, friendId: number) : Promise<boolean> {

        // bring user leftjoin etc
        //or
        // make a func where sender : id1 and receiver id2 || viceversa in friends table
        //should use indexes to make it better

        const res : Friends[] | undefined = await this.friendsRepository.findByCondition({
            where :[
                {
                    sender: userId,
                    receiver : friendId,
                },
                {
                    sender: friendId,
                    receiver : userId,
                }
            ]
        })
        return (res.length > 0)
    };
}
