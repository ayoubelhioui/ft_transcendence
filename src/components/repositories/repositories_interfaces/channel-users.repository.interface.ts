import { Channel, ChannelUsers, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";
import { ChannelUserRole } from "src/global/types/channel-user-roles";


//TO ADD extra custom methods
interface IChannelUsersRepository extends IBaseRepository<ChannelUsers>
{
    addUserToChannel(user : User, channel : Channel, role : ChannelUserRole) : Promise < ChannelUsers | undefined >;
    isUserInChannel(user: User, channel : Channel) : Promise <ChannelUsers | undefined>;
    getNextOwner( channel : Channel, prevOwnerId : number) : Promise<ChannelUsers | undefined>;
    setNextOwner(nextOwner: ChannelUsers) : Promise<ChannelUsers | undefined>;
    getUserChannelsWithLastMessage(userId : number) : Promise < Channel[] | undefined >;
    getChannelUsers(channelId : number) : Promise < User[] | undefined >;
    getUserChannelsId(userId : number) : Promise < any[] | undefined >;

}


export default IChannelUsersRepository;