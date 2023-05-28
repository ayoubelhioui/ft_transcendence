import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()

class Achievement{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public icon: string;

    @Column()
    public name: string;

    // @ManyToMany(() => User, user => user.achievements)
    // @JoinTable()
    // users: User[];
}

export default Achievement;