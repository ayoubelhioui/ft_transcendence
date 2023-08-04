import { Channel, ChannelInvites, User } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IChannelInvitesReposiroty extends IBaseRepository<ChannelInvites>
{
  isInvited(user : User, channel : Channel, token : string) : Promise<ChannelInvites>;
}

export default IChannelInvitesReposiroty;