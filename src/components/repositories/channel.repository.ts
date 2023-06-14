import { InjectRepository } from "@nestjs/typeorm";
import { Channel, User } from "src/database/entities";
import { In, Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import IChannelRepository from "src/components/repositories/repositories_interfaces/channel.repository.interface";
import { ChannelsVisibility } from "../../global/types/channel-visibility.type";
import { ChannelWithPassword } from '../../global/dto/channel-with-password.dto';

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

  async getChannelWithPassword(channelId : number) : Promise<ChannelWithPassword | undefined> {
    const channelWithPassword = await this.entity
    .createQueryBuilder('channel')
    .addSelect('channel.id', 'id')
    .addSelect('channel.name', 'name')
    .addSelect('channel.password', 'password')
    .where('channel.id = :channelId', { channelId })
    .getRawOne();
    return (channelWithPassword);
  }
}

export default ChannelRepository;