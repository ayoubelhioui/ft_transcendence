declare enum channelUserRole {
    owner = 0,
    admin = 1,
    member = 2
}
declare class ChannelUsers {
    id: number;
    userRole: channelUserRole;
}
export default ChannelUsers;
