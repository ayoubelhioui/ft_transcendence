import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './index';

@Entity()
class BlockedUsers {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() =>User, user => user.blocked, {onDelete: 'CASCADE'})
    public blocked: User;

    @ManyToOne(() =>User, user => user.blockedBy, {onDelete: 'CASCADE'})
    public blockedBy: User;
    
}

export default BlockedUsers;