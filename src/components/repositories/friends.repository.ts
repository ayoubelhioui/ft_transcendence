import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Friends, User } from "src/database/entities";
import ABaseRepository from "./repositories_interfaces/base/base.repository.abstract";
import { IFriendsRepository } from "./repositories_interfaces";
import { friendRequestStatus } from "src/global/types";



@Injectable()
class FriendsRepository extends ABaseRepository<Friends> implements IFriendsRepository
{
  constructor(
    @InjectRepository(Friends)
    protected entity: Repository<Friends>,
  ) {
    super();
  }

  async getFriendsOfId(user: User): Promise<User[]> {
    const friends = await this.entity
      .createQueryBuilder('friend')
      .where('(friend.senderId = :userId OR friend.receiverId = :userId)', { userId: user.id })
      .andWhere('friend.status = :status', { status: friendRequestStatus.accepted })
      .leftJoinAndSelect('friend.sender', 'sender')
      .leftJoinAndSelect('friend.receiver', 'receiver')
      .getMany();
  
    const users: User[] = friends.map((friend) => {
      if (friend.sender.id === user.id)
        return friend.receiver;
      return friend.sender;
    });
  
    return users;
  }
  

async getFriendRequestOfId(user : User) : Promise <Friends[]>
{
    return await(
        this.findByOptions({
            where : {
                receiver : user,
                status : friendRequestStatus.pending,
            }, 
            relations : ['sender']
        })
    );
}



async deleteFriend(user: User, friend: User) : Promise<number>{
  const deleteResult =  await this.entity.createQueryBuilder()
    .delete()
    .from(Friends) // Target the table associated with the Friends entity
    .where('status = :status')
    .andWhere(
      '(senderId = :senderId AND receiverId = :receiverId) OR (senderId = :receiverId AND receiverId = :senderId)',
      {
        status: friendRequestStatus.accepted,
        senderId: user.id,
        receiverId: friend.id,
      }
    )
    .execute();

    return deleteResult.affected ;
}


//UTILITY: use this to get two entities in one request

// async getFriendRelationShip(senderId: number, receiverId: number) {
//     const users = await this.entity.createQueryBuilder('user')
//       .where('user.id IN (:ids)', { ids: [senderId, receiverId] })
//       .getMany();
  
//     const [sender, receiver] = users;
  
//     if (!sender || !receiver) {
//       throw new Error('Invalid sender or receiver ID');
//     }
  
//     // Proceed with creating the friend relationship using the sender and receiver entities
// }
  




}

export default FriendsRepository;