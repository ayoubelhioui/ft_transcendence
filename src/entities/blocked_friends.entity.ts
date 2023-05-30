import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './index';

@Entity()

class BlockedUsers {
    @PrimaryGeneratedColumn()
    public id: number;

    @PrimaryColumn({ name: 'blocked' })
    @ManyToOne(() =>User, user => user.blocked)
    public blocked: User;

    @PrimaryColumn({ name: 'blockedBy' })
    @ManyToOne(() =>User, user => user.blockedBy)
    public blockedBy: User;
    
}

export default BlockedUsers;