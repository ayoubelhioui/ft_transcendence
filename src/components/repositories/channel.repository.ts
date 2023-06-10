import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { In, Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import IChannelRepository from "src/components/repositories/repositories_interfaces/channel.repository.interface";
import { ChannelsVisibility } from "../channels/types/channel-visibility.type";
import { ChannelUserRole } from '../channels/types/channel-user-roles';

@Injectable()
class ChannelRepository extends ABaseRepository<Channel> implements IChannelRepository
{
  constructor(
    @InjectRepository(Channel)
    protected entity: Repository<Channel>,
  ) {
    super();
  }


  async getChannels() : Promise < Channel[] | undefined > {
    const visibleChannels : ChannelsVisibility[] = [ChannelsVisibility.public, ChannelsVisibility.protected];
    return await this.entity.find({
      where: {
        visibility : In(visibleChannels)
      }
    });
  }

  async getOwnerChannels(owner : User) : Promise < Channel[] | undefined > {
    const condition = {owner};
    return (this.findByCondition(condition));
  }

}

export default ChannelRepository;