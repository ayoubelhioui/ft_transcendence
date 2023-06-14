import { Channel, User, UsersMuted } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IUsersMutedRepository extends IBaseRepository<UsersMuted>
{
    muteMember(targetedUser : User, channel : Channel, dateMuteExpiration : Date);
    isUserMuted(user : User, channel : Channel) : Promise <boolean> ;

}

export default IUsersMutedRepository;