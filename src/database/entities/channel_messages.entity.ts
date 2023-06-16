import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index, OneToOne, JoinColumn } from 'typeorm';
import Channel from './channel.entity';

import {User} from './index'

@Entity()
class ChannelMessages{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type : "text"})
    public message: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Index()
    public time: Date;

    @Column({nullable: true})
    public seen: boolean;

    @ManyToOne(() => User, (user) => user.channelMessages, {onDelete: 'CASCADE'})
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {onDelete: 'CASCADE'})
    channel : Channel;

 

}

export default ChannelMessages;