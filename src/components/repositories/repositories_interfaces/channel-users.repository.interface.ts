import { Channel, ChannelUsers, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";
import { ChannelUserRole } from "src/components/channels/types/channel-user-roles";


//TO ADD extra custom methods
interface IChannelUsersRepository extends IBaseRepository<ChannelUsers>
{
    addUserToChannel(user : User, channel : Channel, role : ChannelUserRole) : Promise < ChannelUsers | undefined >;
    isUserInChannel(user: User, channel : Channel) : Promise <ChannelUsers | undefined>;

}


export default IChannelUsersRepository;