import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {User} from './index';

@Entity()
class Game{
    @PrimaryGeneratedColumn("uuid")
    public token: string;

    @ManyToOne(() => User, (user) => user.gamePlayer1)
    public player1: User;

    @ManyToOne(() => User, (user) => user.gamePlayer2, {nullable: true })
    public player2: User;

    @Column({nullable : true})
    public player1_score: number;

    @Column({nullable : true})
    public player2_score: number;

    //if null then game is live
    @Column({nullable : true, default : null})
    public match_time_end: Date;

    @Column()
    public type: boolean;
}

export default Game