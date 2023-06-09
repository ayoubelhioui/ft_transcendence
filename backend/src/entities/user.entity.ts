
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

import {Achievement, Channel, ChannelMessages, ChannelUsers, 
    MatchHistory,UsersMuted, LiveGames,Notification, Friends, BlockedUsers} from './index'



@Entity()
class User{
    @PrimaryGeneratedColumn()
    public id: number;

    @PrimaryColumn()
    public IntraId: number;

    @Column()
    public username: string;
    
    @Column()
    public avatar: string;

    @Column()
    public wins: number;

    @Column()
    public loss: number;

    @Column()
    public winrate: number;

    @Column()
    public two_factors_enabled: boolean;

    @ManyToMany(() => Achievement, (achievement) => achievement.users)
    public achievements: Achievement[];

    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player1)
    public matchHistoryPlayer1: MatchHistory[];

    /* ******************************************************* */
    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player2)
    public matchHistoryPlayer2: MatchHistory[];

    /************************************************************/
    @OneToMany(() => Channel, (channel: Channel) => channel.owner)
    public channels: Channel[];


    /************************************************************/
    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.user)
    channelMessages: ChannelMessages[];


    /************************************************************/
    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.user)
    public channelUsers: ChannelUsers[];


    /************************************************************/
    @OneToMany(() => UsersMuted, (userMuted) => userMuted.user)
    public usersMuted: UsersMuted[];


    /************************************************************/
    @ManyToMany(() => Channel, channel => channel.blacklistedUsers)
    public forbiddenChannels: Channel[];


    /************************************************************/
    @OneToMany(() => LiveGames, (liveGames) => liveGames.player1)
    public liveGamesPlayer1: LiveGames[];

    /* ******************************************************* */
    @OneToMany(() => LiveGames, (liveGames) => liveGames.player2)
    public liveGamesPlayer2: LiveGames[];


    /* ******************************************************* */
    @OneToMany(() => Notification, (notifications: Notification) => notifications.receiver)
    public notifications: Notification[];


    /* ******************************************************* */
    @OneToMany(() => Notification, (notifications: Notification) => notifications.sender)
    public sentNotifications: Notification[];


    /************************************************************/
    @ManyToMany(() => Channel, channel => channel.invitedUsers)
    public channelInvites: Channel[];

    /* ******************************************************* */
    @OneToMany(() => Friends, (friend: Friends) => friend.sender)
    public sentFriends: Friends[];

    /* ******************************************************* */
    @OneToMany(() => Friends, (friend: Friends) => friend.receiver)
    public receivedFriends: Friends[];


    @OneToMany(() => BlockedUsers, blockedUsers => blockedUsers.blocked)
    public blocked: BlockedUsers[];


    @OneToMany(() => BlockedUsers, blockedUsers => blockedUsers.blockedBy)
    public blockedBy: BlockedUsers[];
}

export default User;