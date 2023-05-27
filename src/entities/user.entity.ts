
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

import {Achievement, Channel, ChannelMessages, ChannelUsers, MatchHistory} from './index'



@Entity()
class User{
    @PrimaryGeneratedColumn()
    public id: number;

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

    @ManyToMany(() => Achievement, achievement => achievement.users)
    public achievements: Achievement[];

    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player1)
    public matchHistoryPlayer1: MatchHistory[];

    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player2)
    public matchHistoryPlayer2: MatchHistory[];


    @OneToMany(() => Channel, (channel) => channel.owner);
    public channels: Channel[];


    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.user)
    channelMessages: ChannelMessages[];

    


    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.user)
    public ChannelUsers: ChannelUsers[];

}

export default User;