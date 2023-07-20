
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, ManyToOne, Unique } from 'typeorm';

import {Achievement, Channel, ChannelMessages, ChannelUsers, 
    Game,UsersMuted,Notification, Friends, BlockedUsers} from './index'
import Invites from './channel-invites.entity';



@Entity()
class User{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public IntraId: number;
    
    @Column()
    public username: string;
    
    @Column({nullable: true})
    public avatar: string;

    @Column()
    public wins: number = 0;

    @Column()
    public loss: number = 0;

    @Column()
    public winrate: number = 0;

    @ManyToMany(() => Achievement, (achievement) => achievement.users, { cascade: true, onDelete: 'CASCADE' })
    public achievements: Achievement[];

    @OneToMany(() => Game, (matchHisory) => matchHisory.player1, { cascade: true, onDelete: 'CASCADE' })
    public gamePlayer1: Game[];

    /* ******************************************************* */
    @OneToMany(() => Game, (matchHisory) => matchHisory.player2, { cascade: true, onDelete: 'CASCADE' })
    public gamePlayer2: Game[];

    /************************************************************/
    @OneToMany(() => Channel, (channel: Channel) => channel.owner, { cascade: true, onDelete: 'CASCADE' })
    public channels: Channel[];


    /************************************************************/
    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.user, { cascade: true, onDelete: 'CASCADE' })
    channelMessages: ChannelMessages[];


    /************************************************************/
    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.user, { cascade: true, onDelete: 'CASCADE' })
    public channelUsers: ChannelUsers[];


    /************************************************************/
    @OneToMany(() => UsersMuted, (userMuted) => userMuted.user, { cascade: true, onDelete: 'CASCADE' })
    channelsMuted: UsersMuted[];


    /************************************************************/
    @ManyToMany(() => Channel, channel => channel.blacklistedUsers, { cascade: true })
    public forbiddenChannels: Channel[];




    /* ******************************************************* */
    @OneToMany(() => Notification, (notifications: Notification) => notifications.receiver, { cascade: true, onDelete: 'CASCADE' })
    public notifications: Notification[];


    /* ******************************************************* */
    @OneToMany(() => Notification, (notifications: Notification) => notifications.sender, { cascade: true, onDelete: 'CASCADE' })
    public sentNotifications: Notification[];


    /************************************************************/
    @ManyToMany(() => Channel, channel => channel.invitedUsers, { cascade: true, onDelete: 'CASCADE' })
    public channelInvites: Channel[];

    /* ******************************************************* */
    @OneToMany(() => Friends, (friend: Friends) => friend.sender, { cascade: true, onDelete: 'CASCADE' })
    public sentFriends: Friends[];

    /* ******************************************************* */
    @OneToMany(() => Friends, (friend: Friends) => friend.receiver, { cascade: true, onDelete: 'CASCADE' })
    public receivedFriends: Friends[];


    @OneToMany(() => BlockedUsers, blockedUsers => blockedUsers.blocked, { cascade: true, onDelete: 'CASCADE' })
    public blocked: BlockedUsers[];


    @OneToMany(() => BlockedUsers, blockedUsers => blockedUsers.blockedBy, { cascade: true, onDelete: 'CASCADE' })
    public blockedBy: BlockedUsers[];


    @OneToMany(() => Invites, (invites) => invites.user, { cascade: true, onDelete: 'CASCADE' })
    public group_invites_received: Invites[];

    @OneToMany(() => Invites, (invites) => invites.sender, { cascade: true, onDelete: 'CASCADE' })
    public group_invites_sent: Invites[];

    @Column()
    public two_factors_enabled: boolean;
}


export default User;