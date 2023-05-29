import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import Channel from './channel.entity';

import {User} from './index'

@Entity()
class ChannelMessages{


    @PrimaryGeneratedColumn()
    public id: number;

    @PrimaryColumn({ name: 'user' })
    @ManyToOne(() => User, (user) => user.channelMessages ,{ cascade: true })
    user : User;

    @PrimaryColumn({ name: 'channel' })
    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {cascade: true})
    channel : Channel;

    @Column()
    public message: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    public time: Date;

    @Column({nullable: true})
    public seen: boolean;


}

export default ChannelMessages;