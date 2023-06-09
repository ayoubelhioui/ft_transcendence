import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';

import {User, Channel} from './index';

@Entity()
class ChannelBlacklist{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {cascade: true})
    channel : Channel;

    @ManyToOne(() => User, (user) => user.channelMessages , { cascade: true } )
    user : User;
}

export default ChannelBlacklist;