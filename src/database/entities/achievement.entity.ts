import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './index';

@Entity()
class Achievement{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public icon: string;

    @Column()
    public name: string;

    @ManyToMany(() => User, user => user.achievements, {onDelete: 'CASCADE'})
    @JoinTable()
    users: User[];
}

export default Achievement;