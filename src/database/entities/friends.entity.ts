import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Timestamp } from 'typeorm';
import {User} from './index';
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

}

export default Friends;