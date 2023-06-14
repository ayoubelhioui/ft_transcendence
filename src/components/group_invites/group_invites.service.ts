import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChannelService } from '../channels/channel.service';
import IChannelInvitesReposiroty from '../repositories/repositories_interfaces/channel-invites.repository.interface';
import { Channel, ChannelInvites, User } from 'src/database/entities';
import { ChannelUserRole } from 'src/global/types/channel-user-roles';

@Injectable()
export class GroupInvitesService {

    constructor(
        private readonly channelService : ChannelService,
        @Inject('MyChannelInvitesRepository') private readonly channelInvitesRepository: IChannelInvitesReposiroty,       
    ){}
    
     
    inviteToGroup(invitedUser : User, channel : Channel) : Promise <ChannelInvites> {
        return (this.channelInvitesRepository.create({
            user: invitedUser, 
            channel
        }));
    }

    private async isInvited(user : User, channel : Channel, token : string) : Promise<ChannelInvites> {
        const condition = {
            token,
            user,
            group : channel

        }
        const invite : ChannelInvites | undefined = await this.channelInvitesRepository.findOneByCondition(condition);
        if (!invite)
            throw new NotFoundException("this invitation Not Exist");
        return (invite);
    }

    async acceptInvite(user : User, channel : Channel, token : string) {
        const invite : ChannelInvites = await this.isInvited(user, channel, token);
        return (Promise.all([
            this.channelInvitesRepository.remove(invite),
            this.channelService.addUserToChannel(user, channel, ChannelUserRole.member)
        ]));
    }

    async refuseInvite(user : User, channel : Channel, token : string){
        const invite : ChannelInvites = await this.isInvited(user, channel, token);
        if (!invite)
            throw new NotFoundException("this invitation Not Exist");
        return (this.channelInvitesRepository.remove(invite));
    };

}
