import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import {User, ChannelMessages, ChannelUsers} from './index';
import UsersMuted from './users_muted.entity';



@Entity()
class LiveGames{
    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(() => User, (user) => user.liveGamesPlayer1)
    public player1: User;

    @ManyToOne(() => User, (user) => user.liveGamesPlayer2)
    public player2: User;


    @Column()
    public gameType: boolean;



}

export default LiveGames