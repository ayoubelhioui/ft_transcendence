import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelBlacklist, User } from "src/database/entities";
import {  Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelBlacklistRepository } from "./repositories_interfaces";
import IChannelInvitesReposiroty from "./repositories_interfaces/channel-invites.repository.interface";
import ChannelInvites from "src/database/entities/channel-invites.entity";

@Injectable()
class ChannelInvitesRepository extends ABaseRepository<ChannelInvites> implements IChannelInvitesReposiroty
{
  constructor(
    @InjectRepository(ChannelInvites)
    protected entity: Repository<ChannelInvites>,
  ) {
    super();
  }
}

export default ChannelInvitesRepository;