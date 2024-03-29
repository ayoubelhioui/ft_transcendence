import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

import {User, ChannelMessages, ChannelUsers} from './index';
import UsersMuted from './users_muted.entity';
import Invites from './channel-invites.entity';
import { ChannelsVisibility } from 'src/global/types/channel-visibility.type';
import { Exclude } from 'class-transformer';


@Entity()
class Channel{
    

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    public creationTime: Date;

    @Exclude() // Exclude this property from serialization
    @Column({nullable: true, type: 'text', select: false})
    public password: string;

    @ManyToOne(() => User, (user) => user.channels,  { nullable: true})
    public owner: User;

    @Column({default : ChannelsVisibility.public})
    public visibility: ChannelsVisibility;
    
    @Column({default : true})
    public isGroup : boolean;


    @Column({default : "youtube.png"})
    public avatar: string;
   
    
    @OneToMany(() => ChannelMessages, (channelMessages) => channelMessages.channel, {nullable : true })
    channelMessages: ChannelMessages[];

    @OneToMany(() => ChannelUsers, (channelUsers) => channelUsers.channel, {nullable : true })
    public channelUsers: ChannelUsers[];


    @OneToMany(() => UsersMuted, (userMuted) => userMuted.channel, {nullable : true, cascade: true, onDelete: 'CASCADE' })
    public usersMuted: UsersMuted[];


    @ManyToMany(() => User, user => user.forbiddenChannels, {nullable : true })
    @JoinTable()
    blacklistedUsers: User[];


    @ManyToMany(() => User, user => user.channelInvites, {nullable : true})
    @JoinTable()
    public invitedUsers: User[];


    @OneToMany(() => Invites, (invites) => invites.group, {nullable : true, cascade: true, onDelete: 'CASCADE' })
    public group_invites: Invites[];

    //update on each message sent
    @OneToOne(() => ChannelMessages,  {nullable : true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    lastMessage: ChannelMessages

    // toJSON () {
    //     delete this.password;
    //     return this;
    // }

}

export default Channel
