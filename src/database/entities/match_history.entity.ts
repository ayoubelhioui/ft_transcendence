import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from './index';

@Entity()
class MatchHistory{
    @PrimaryGeneratedColumn("uuid")
    public token: string;

    @ManyToOne(() => User, (user) => user.matchHistoryPlayer1, {onDelete: 'CASCADE'})
    public player1: User;

    @ManyToOne(() => User, (user) => user.matchHistoryPlayer2, {onDelete: 'CASCADE'})
    public player2: User;

    @Column()
    public player1_score: number;

    @Column()
    public player2_score: number;

    //if null then game is live
    @Column({nullable : true, default : null})
    public match_time_end: Date;

    @Column()
    public type: boolean;
}

export default MatchHistory