import { ChannelInvites } from "src/database/entities";
import IBaseRepository from "./base/base.repository.interface";


//TO ADD extra custom methods
interface IChannelInvitesReposiroty extends IBaseRepository<ChannelInvites>
{
}

export default IChannelInvitesReposiroty;