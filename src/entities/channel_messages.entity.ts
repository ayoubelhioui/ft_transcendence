import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Default, OneToMany } from 'typeorm';
import User from './user.entity';
import Channel from './channel.entity';
import { channel } from 'diagnostics_channel';

@Entity()
class ChannelMessages{
    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(() => User, (user) => user.channelMessages, {primary : true})
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.channelMessages, {primary : true})
    channel : Channel;

    @Column()
    public message: string;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    public time: Date;


}

export default ChannelMessages;