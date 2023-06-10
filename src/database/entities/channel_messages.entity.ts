import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import Channel from './channel.entity';

import {User} from './index'
import Invites from './invites.entity';

@Entity()
class ChannelMessages{


    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public message: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public time: Date;

    @Column({nullable: true})
    public seen: boolean;

    @ManyToOne(() => User, (user) => user.channelMessages, {onDelete: 'CASCADE'})
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {onDelete: 'CASCADE'})
    channel : Channel;

 

}

export default ChannelMessages;