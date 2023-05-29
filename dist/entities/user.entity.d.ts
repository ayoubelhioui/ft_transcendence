import { Achievement, Channel, ChannelMessages, ChannelUsers, MatchHistory } from './index';
declare class User {
    id: number;
    username: string;
    avatar: string;
    wins: number;
    loss: number;
    winrate: number;
    achievements: Achievement[];
    matchHistoryPlayer1: MatchHistory[];
    matchHistoryPlayer2: MatchHistory[];
    channels: Channel[];
    channelMessages: ChannelMessages[];
    channelUsers: ChannelUsers[];
}
export default User;
