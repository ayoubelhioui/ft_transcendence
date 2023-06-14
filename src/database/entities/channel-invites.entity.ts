import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Channel from "./channel.entity";
import User from "./user.entity";

@Entity()
class ChannelInvites{
    @PrimaryGeneratedColumn("uuid")
    public token: string;

    @ManyToOne(() => User, (user) => user.group_invites, {onDelete: 'CASCADE'})
    public user: User;

    @ManyToOne(() => Channel, (channel) => channel.group_invites, {onDelete: 'CASCADE'})
    public group: Channel;
}

export default ChannelInvites;