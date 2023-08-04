import { Achievement, Channel, ChannelBlacklist, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IAchievementRepository extends IBaseRepository<Achievement>
{
}

export default IAchievementRepository;