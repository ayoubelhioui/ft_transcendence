import { User, Channel } from './index';
declare enum channelUserRole {
    owner = 0,
    admin = 1,
    member = 2
}
declare class ChannelUsers {
    id: number;
    user: User;
    channel: Channel;
    userRole: channelUserRole;
}
export default ChannelUsers;
