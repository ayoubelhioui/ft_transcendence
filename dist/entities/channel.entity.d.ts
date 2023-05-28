declare enum ChannelsVisibility {
    private = 0,
    public = 1,
    protected = 2
}
declare class Channel {
    id: number;
    name: string;
    password: string;
    visibility: ChannelsVisibility;
}
export default Channel;
