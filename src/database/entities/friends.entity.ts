import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Timestamp, OneToOne } from 'typeorm';
import {Channel, User} from './index';
import { friendRequestStatus } from 'src/global/types';


@Entity()
class Friends{
   @PrimaryGeneratedColumn()
   public id : number;

   @Column()
   public status : friendRequestStatus;

   @Column({/*give it default of date now (of the creation)*/})
   public request_time : Date;

   @Column({nullable : true})
   public accepted_time : Date;

   @ManyToOne(() => User, (user) => user.sentFriends, {onDelete: 'CASCADE'})
    public sender: User;

    @ManyToOne(() => User, (user) => user.receivedFriends, {onDelete: 'CASCADE'})
    public receiver: User;

    @OneToOne(() => Channel, (channel) => channel.id , {onDelete: 'CASCADE', nullable : true})
    channel : Channel;
}

export default Friends;