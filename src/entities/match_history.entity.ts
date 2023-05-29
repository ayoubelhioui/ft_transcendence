import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from './index';

@Entity()

class MatchHistory{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, (user) => user.matchHistoryPlayer1)
    public player1: User;

    @ManyToOne(() => User, (user) => user.matchHistoryPlayer2)
    public player2: User;

    @Column()
    public player1_score: number;

    @Column()
    public player2_score: number;

    @Column()
    public match_time_end: Date;

    @Column()
    public type: boolean;
}

export default MatchHistory