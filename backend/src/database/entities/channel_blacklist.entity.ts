import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index } from 'typeorm';

import {User, Channel} from './index';

@Entity()
@Index(['user', 'channel'], {unique : true})
class ChannelBlacklist{

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages)
    channel : Channel;

    @ManyToOne(() => User, (user) => user.channelMessages)
    user : User;
}

export default ChannelBlacklist;