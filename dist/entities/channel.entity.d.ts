import { User, ChannelMessages, ChannelUsers } from './index';
import UsersMuted from './users_muted.entity';
declare enum ChannelsVisibility {
    private = 0,
    public = 1,
    protected = 2
}
declare class Channel {
    id: number;
    name: string;
    password: string;
    owner: User;
    visibility: ChannelsVisibility;
    channelMessages: ChannelMessages[];
    channelUsers: ChannelUsers[];
    usersMuted: UsersMuted[];
    blacklistedUsers: User[];
    invitedUsers: User[];
}
export default Channel;
