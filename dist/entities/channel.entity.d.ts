import { User, ChannelMessages, ChannelUsers } from './index';
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
}
export default Channel;
