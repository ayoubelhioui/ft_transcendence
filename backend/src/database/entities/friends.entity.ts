import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Timestamp, OneToOne, JoinColumn } from 'typeorm';
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

   @ManyToOne(() => User, (user) => user.sentFriends)
    public sender: User;

    @ManyToOne(() => User, (user) => user.receivedFriends)
    public receiver: User;

    @OneToOne(() => Channel, {onDelete: 'CASCADE', nullable : true})
    @JoinColumn()
    channel : Channel;
}

export default Friends;