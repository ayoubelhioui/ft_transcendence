import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import Channel from './channel.entity';

import {User} from './index'
import Invites from './invites';

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

    @ManyToOne(() => User, (user) => user.channelMessages ,{ cascade: true })
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {cascade: true})
    channel : Channel;

 

}

export default ChannelMessages;