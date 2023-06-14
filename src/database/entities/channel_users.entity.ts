import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Index } from 'typeorm';

import {User, Channel} from './index';
import { ChannelUserRole } from 'src/global/types/channel-user-roles';



@Entity()
class ChannelUsers{
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => User, user => user.channelUsers, {onDelete: 'CASCADE'})
    public user: User;

    @ManyToOne(() => Channel, channel => channel.channelUsers, {onDelete: 'CASCADE'})
    public channel: Channel;

    @Column()
    public userRole : ChannelUserRole;

}

export default ChannelUsers;