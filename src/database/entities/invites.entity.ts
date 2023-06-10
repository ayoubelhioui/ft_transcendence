import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Channel from "./channel.entity";
import User from "./user.entity";

@Entity()
class Invites{
    @PrimaryGeneratedColumn("uuid")
    public token: string;

    @ManyToOne(() => User, (user) => user.group_invites, {onDelete: 'CASCADE'})
    public user_id: User;

    @ManyToOne(() => Channel, (channel) => channel.group_invites, {onDelete: 'CASCADE'})
    public group_id : Channel;
}

export default Invites;