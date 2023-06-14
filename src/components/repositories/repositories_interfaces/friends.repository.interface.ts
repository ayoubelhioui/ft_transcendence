import { Friends, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IFriendsRepository extends IBaseRepository<Friends>
{
    getFriendsOfId(user : User) : Promise <Friends[]>;
    getFriendRequestOfId(user : User) : Promise <Friends[]>
    
}

export default IFriendsRepository;