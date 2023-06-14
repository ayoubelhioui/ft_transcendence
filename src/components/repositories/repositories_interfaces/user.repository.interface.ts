import { ChannelUsers, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IUserRepository extends IBaseRepository<User>
{
    fetchTwoUsers(user1Id: number, user2Id: number);
}

export default IUserRepository;