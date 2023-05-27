import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

class Achievement{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public icon: string;

    @Column()
    public name: string;
}   