import { BlockedUsers} from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IBlockedUsersRepository extends IBaseRepository<BlockedUsers>
{

}


export default IBlockedUsersRepository;