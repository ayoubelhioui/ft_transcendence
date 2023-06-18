import { Channel, User, ChannelUsers } from 'src/database/entities';
import IBaseRepository from "./base/base.repository.interface";
import { ChannelWithPassword } from 'src/global/dto/channel-with-password.dto';


//TO ADD extra custom methods
interface IChannelRepository extends IBaseRepository<Channel>
{
    getChannels(user : User) : Promise < Channel[] | undefined >;
    getOwnerChannels(owner : User) : Promise < Channel[] | undefined >;
    getChannelWithPassword(channelId : number) : Promise<ChannelWithPassword | undefined>;
    

}

export default IChannelRepository;