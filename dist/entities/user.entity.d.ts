import { Achievement, Channel, ChannelMessages, ChannelUsers, MatchHistory, UsersMuted, LiveGames, Notification, Friends, BlockedUsers } from './index';
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
    usersMuted: UsersMuted[];
    forbiddenChannels: Channel[];
    liveGamesPlayer1: LiveGames[];
    liveGamesPlayer2: LiveGames[];
    notifications: Notification[];
    sentNotifications: Notification[];
    channelInvites: Channel[];
    sentFriends: Friends[];
    receivedFriends: Friends[];
    blocked: BlockedUsers[];
    blockedBy: BlockedUsers[];
}
export default User;
