import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

import { User, Channel } from './index';

@Entity()
class UsersMuted{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {onDelete: 'CASCADE'})
    channel : Channel;

    @ManyToOne(() => User, (user) => user.channelMessages, {onDelete: 'CASCADE'})
    user : User;

    @Column()
    public expirationTime: Date;
}

export default UsersMuted;