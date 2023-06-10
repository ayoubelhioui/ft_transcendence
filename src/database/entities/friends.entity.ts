import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, PrimaryColumn, Timestamp } from 'typeorm';

import {User} from './index';

enum friendRequestStatus{
	pending,
	accepted,
	refused
}

@Entity()
class Friends{
   @PrimaryGeneratedColumn()
   public id : number;

   @Column()
   public status : friendRequestStatus;

   @Column()
   public request_time : Date;

   @Column()
   public accepted_time : Date;

   @ManyToOne(() => User, (user) => user.sentFriends, {onDelete: 'CASCADE'})
    public sender: User;

    @ManyToOne(() => User, (user) => user.receivedFriends, {onDelete: 'CASCADE'})
    public receiver: User;

}

export default Friends;