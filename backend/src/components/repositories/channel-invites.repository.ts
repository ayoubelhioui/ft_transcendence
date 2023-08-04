import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelBlacklist, User } from "src/database/entities";
import {  Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelBlacklistRepository } from "./repositories_interfaces";
import IChannelInvitesReposiroty from "./repositories_interfaces/channel-invites.repository.interface";
import ChannelInvites from "src/database/entities/channel-invites.entity";
import { sq } from "date-fns/locale";

@Injectable()
class ChannelInvitesRepository extends ABaseRepository<ChannelInvites> implements IChannelInvitesReposiroty
{
  constructor(
    @InjectRepository(ChannelInvites)
    protected entity: Repository<ChannelInvites>,
  ) {
    super();
  }

  async isInvited(user : User, channel : Channel, token : string) : Promise<ChannelInvites> {
    const options = {
      token,
      user,
      channel,
    };

    console.log("option == ", options);
  
    const query  = this.entity
    .createQueryBuilder('invite')
    .where('invite.token = :token', { token: options.token })
    .andWhere('invite.userId = :user', { user: options.user.id })
    .andWhere('invite.groupId = :channel', { channel: options.channel.id })
    .leftJoinAndSelect('invite.sender', 'sender');
    // console.log(query.getSql());

    return query.getOne();
  }
}

export default ChannelInvitesRepository;