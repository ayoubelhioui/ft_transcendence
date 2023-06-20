import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChannelService } from '../channels/channel.service';
import IChannelInvitesReposiroty from '../repositories/repositories_interfaces/channel-invites.repository.interface';
import { Channel, ChannelInvites, User } from 'src/database/entities';
import { ChannelUserRole } from 'src/global/types/channel-user-roles';
import { NotificationService } from '../notification/notification.service';
import { NotificationDto } from '../notification/dto/notification.dto';

@Injectable()
export class GroupInvitesService {

    constructor(
        private readonly channelService : ChannelService,
        private readonly notificationService : NotificationService,
        @Inject('MyChannelInvitesRepository') private readonly channelInvitesRepository: IChannelInvitesReposiroty,       
    ){}
    
     
    async inviteToGroup(sender : User , invitedUser : User, channel : Channel) : Promise <ChannelInvites> {
        await this.channelService.isUserBlacklisted(invitedUser, channel);
        const invitation : ChannelInvites =  await this.channelInvitesRepository.create({
            user: invitedUser, 
            sender,
            group : channel
        })
        const notificationInfos : NotificationDto = {
            message : `${sender.username} Invite you To Channel ${channel.name}`, 
            acceptLink : `channels/${channel.id}/invite/${invitation.token}/accept`,
            refuseLink : `channels/${channel.id}/invite/${invitation.token}/refuse`,
            acceptMethod : "POST"
        }
        await this.notificationService.createNotification(notificationInfos, sender, invitedUser);
        return (invitation);
    }

    private async isInvited(user : User, channel : Channel, token : string) : Promise<ChannelInvites> {
        const options = {
            where : {
                token,
                user,
                group : channel
            },
           relations : ['sender'] 
        }
        const invite : ChannelInvites | undefined = await this.channelInvitesRepository.findOneByOptions(options);
        if (!invite)
            throw new NotFoundException("this invitation Not Exist");
        return (invite);
    }

    async acceptInvite(user : User, channel : Channel, token : string) {
        const invite : ChannelInvites = await this.isInvited(user, channel, token);
        const notificationInfos = {
            message : `${user.username} Joined the Channel`
        }
        return (Promise.all([
            this.channelInvitesRepository.remove(invite),
            this.notificationService.createNotification(notificationInfos, user, invite.sender),
            this.channelService.joinUserToChannel(user, channel, ChannelUserRole.member),
        ]));
    }

    async refuseInvite(user : User, channel : Channel, token : string){
        const invite : ChannelInvites = await this.isInvited(user, channel, token);
        if (!invite)
            throw new NotFoundException("this invitation Not Exist");
        return (this.channelInvitesRepository.remove(invite));
    };

}
