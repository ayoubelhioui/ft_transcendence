import Channel from './channel.entity';
import { User } from './index';
declare class ChannelMessages {
    id: number;
    user: User;
    channel: Channel;
    message: string;
    time: Date;
}
export default ChannelMessages;
