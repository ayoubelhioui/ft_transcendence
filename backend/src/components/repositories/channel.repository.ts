import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelBlacklist, User } from "src/database/entities";
import {  Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable, Query } from '@nestjs/common';
import IChannelRepository from "src/components/repositories/repositories_interfaces/channel.repository.interface";
import { ChannelsVisibility } from "../../global/types/channel-visibility.type";
import { ChannelWithPassword } from '../../global/dto/channel-with-password.dto';
import { getConnection } from 'typeorm';

@Injectable()
class ChannelRepository extends ABaseRepository<Channel> implements IChannelRepository
{
  constructor(
    @InjectRepository(Channel)
    protected entity: Repository<Channel>,
  ) {
    super();
  }

  private getQueryBlacklistedChannelIdByUserAndChannel

  async getChannels(user : User) : Promise < Channel[] | undefined > {
    const channlesQuery = `select id, name, visibility, "channel"."isGroup" from channel \
      where  \
        channel.visibility IN ('public', 'protected') \
      and \
        channel.id NOT IN ( \
                          select "channel_blacklist"."channelId" \
                          from channel_blacklist where  "channel_blacklist"."userId" = $1 and \
                          "channel_blacklist"."channelId" = "channel"."id")
      and \
        channel.id NOT IN ( \
                          select "channel_users"."channelId" \
                          from channel_users where  "channel_users"."userId" = $1 and \
                          "channel_users"."channelId" = "channel"."id");`
    return (await this.entity.query(channlesQuery, [ user.id]))
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