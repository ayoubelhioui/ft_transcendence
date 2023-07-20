import { Friends, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IFriendsRepository extends IBaseRepository<Friends>
{
    getFriendRequestOfId(user : User) : Promise <Friends[]>
    getFriendsOfId(user: User): Promise<User[]>;
    deleteFriend(user: User, friend: User);
    
}

export default IFriendsRepository;