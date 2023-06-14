import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { User, Channel } from './index';

@Entity()
class UsersMuted{

    @PrimaryGeneratedColumn()
    id : number
    
    @ManyToOne(() => Channel, (channel) => channel.usersMuted, {onDelete: 'CASCADE'})
    channel : Channel;

    @ManyToOne(() => User, (user) => user.channelsMuted, {onDelete: 'CASCADE'})
    user : User;

    @Column()
    public expirationTime: Date;
}

export default UsersMuted;