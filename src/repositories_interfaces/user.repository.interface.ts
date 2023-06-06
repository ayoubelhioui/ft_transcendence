import { User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IUserRepository extends IBaseRepository<User>
{

}

export default IUserRepository;