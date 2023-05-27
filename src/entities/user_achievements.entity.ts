import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserAchievements{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public achievementId: number;

}
