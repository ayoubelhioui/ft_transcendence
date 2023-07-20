import { Channel, ChannelBlacklist, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IChannelBlacklistRepository extends IBaseRepository<ChannelBlacklist>
{
    isUserBlacklisted(user : User, channel : Channel) : Promise <Boolean>;
}

export default IChannelBlacklistRepository;