import { Friends } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IFriendsRepository extends IBaseRepository<Friends>
{
    getFriendsOfId(userId : number) : Promise <Friends[]>;
    getFriendRequestOfId(userId : number) : Promise <Friends[]>
    
}

export default IFriendsRepository;