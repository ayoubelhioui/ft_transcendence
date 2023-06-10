import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';

import {User, Channel} from './index';

@Entity()
class ChannelBlacklist{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {onDelete: 'CASCADE'})
    channel : Channel;

    @ManyToOne(() => User, (user) => user.channelMessages, {onDelete: 'CASCADE'})
    user : User;
}

export default ChannelBlacklist;