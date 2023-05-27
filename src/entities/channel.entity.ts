import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './user.entity';
import { channel } from 'diagnostics_channel';
import ChannelMessages from './channel_messages.entity';
import ChannelUsers from './channel_users.entity';

enum ChannelsVisibility 
{
    private,
    public,
    protected
};


@Entity()
class Channel{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public password: string;


    @ManyToOne(() => User, (user) => user.channels)
    public owner: User;


    @Column()
    public visibility: ChannelsVisibility;


    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.channel)
    channelMessages: ChannelMessages[];

    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.channel)
    public ChannelUsers: ChannelUsers[];
}

export default Channel