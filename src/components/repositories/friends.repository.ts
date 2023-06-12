import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Friends } from "src/database/entities";
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

async getFriendsOfId(userId : number) : Promise <Friends[]>
{
    return await(
        this.findByCondition({
            where : [
                {
                    sender : userId,
                    status : friendRequestStatus.accepted,
                },
                {
                    receiver : userId,
                    status : friendRequestStatus.accepted,
                }
            ]
        })
    );
}


async getFriendRequestOfId(userId : number) : Promise <Friends[]>
{
    return await(
        this.findByCondition({
            where : {
                receiver : userId,
                status : friendRequestStatus.pending,
            }
        })
    );
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