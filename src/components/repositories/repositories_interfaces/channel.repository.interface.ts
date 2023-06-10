import { Channel, User, ChannelUsers } from 'src/database/entities';
import IBaseRepository from "./base/base.repository.interface";
import { ChannelUserRole } from 'src/components/channels/types/channel-user-roles';


//TO ADD extra custom methods
interface IChannelRepository extends IBaseRepository<Channel>
{
    getChannels() : Promise < Channel[] | undefined >;
    getOwnerChannels(owner : User) : Promise < Channel[] | undefined >
}

export default IChannelRepository;