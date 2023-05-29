import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from './index';

@Entity()

class Achievement{
    @PrimaryGeneratedColumn()
    public id: number;

    

}

export default Achievement;