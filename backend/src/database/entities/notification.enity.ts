import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

import {User, ChannelMessages, ChannelUsers} from './index';
import UsersMuted from './users_muted.entity';




@Entity()
class Notification {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public message : string;

    @Column({nullable : true})
    public acceptLink : string;

    @Column({default : "PUT"})
    public acceptMethod : string;

    @Column({nullable : true})
    public refuseLink : string;

    @Column({default : "DELETE"})
    public refuseMethod : string;

    @Column()
    public time : Date;


    @Column()
    public seen : boolean;

    @ManyToOne(() => User, (user) => user.notifications)
    public receiver : User;


    @ManyToOne(() => User, (user) => user.sentNotifications)
    public sender : User;
}

export default Notification