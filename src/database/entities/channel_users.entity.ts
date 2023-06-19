import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index } from 'typeorm';

import {User, Channel} from './index';
import { ChannelUserRole } from 'src/global/types/channel-user-roles';



@Entity()
@Index(['user', 'channel'], {unique : true})

class ChannelUsers{
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => User, user => user.channelUsers)
    public user: User;

    @ManyToOne(() => Channel, channel => channel.channelUsers)
    public channel: Channel;

    @Column()
    public userRole : ChannelUserRole;

}

export default ChannelUsers;