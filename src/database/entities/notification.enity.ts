import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import {User, ChannelMessages, ChannelUsers} from './index';
import UsersMuted from './users_muted.entity';




@Entity()
class Notification {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public message : string;

    @Column()
    public link : string;

    @Column()
    public time : Date;


    @Column()
    public seen : boolean;

    @ManyToOne(() => User, (user) => user.notifications, {onDelete: 'CASCADE'})
    public receiver : User;


    @ManyToOne(() => User, (user) => user.sentNotifications, {onDelete: 'CASCADE'})
    public sender : User;
}

export default Notification