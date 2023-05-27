
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import MatchHistory from './match_history.entity';

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

    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player1)
    matchHistoryPlayer1: MatchHistory[];

    @OneToMany(() => MatchHistory, (matchHisory) => matchHisory.player2)
    matchHistoryPlayer2: MatchHistory[];

}
export default User;