import { Channel, ChannelBlacklist, ChannelMessages, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IChannelMessagesRepository extends IBaseRepository<ChannelMessages>
{
    getChannelMessages(channel : Channel, date ?: Date) : Promise <ChannelMessages[] | undefined>;
}

export default IChannelMessagesRepository;