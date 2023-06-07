import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';

import {User, ChannelMessages, ChannelUsers} from './index';
import UsersMuted from './users_muted.entity';
import Invites from './invites';


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

    @Column({nullable: true})
    public password: string;

    @ManyToOne(() => User, (user) => user.channels,  {cascade : true, nullable: true})
    public owner: User;

    @Column()
    public visibility: ChannelsVisibility;
    
    @Column({default : true})
    public isGroup : boolean;
   
    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.channel)
    channelMessages: ChannelMessages[];

    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.channel)
    public channelUsers: ChannelUsers[];


    @OneToMany(() => UsersMuted, (userMuted) => userMuted.channel)
    public usersMuted: UsersMuted[];


    @ManyToMany(() => User, user => user.forbiddenChannels)
    @JoinTable()
    blacklistedUsers: User[];


    @ManyToMany(() => User, user => user.channelInvites)
    @JoinTable()
    public invitedUsers: User[];


    @OneToMany(() => Invites, (invites) => invites.group_id)
    public group_invites: Invites[];

    //update on each message sent
    @OneToOne(() => ChannelMessages, channelMessage => channelMessage.id)
    lastMessage : ChannelMessages;
}

export default Channel