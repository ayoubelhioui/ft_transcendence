import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';

import {User, Channel} from './index';




enum channelUserRole
{
    owner,
    admin,
    member
}

@Entity()
class ChannelUsers{
    @PrimaryGeneratedColumn()
    public id: number;

    @PrimaryColumn({ name: 'user' })
    @ManyToOne(() => User, user => user.channelUsers, { cascade: true })
    user: User;

    @PrimaryColumn({ name: 'channel' })
    @ManyToOne(() => Channel, channel => channel.channelUsers, { cascade: true })
    channel: Channel;

    @Column()
    public userRole : channelUserRole;

}

export default ChannelUsers;