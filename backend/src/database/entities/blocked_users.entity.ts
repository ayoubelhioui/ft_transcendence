import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './index';

@Entity()
class BlockedUsers {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() =>User, user => user.blocked)
    public blocked: User;

    @ManyToOne(() =>User, user => user.blockedBy)
    public blockedBy: User;
    
}

export default BlockedUsers;