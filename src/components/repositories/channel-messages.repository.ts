import { InjectRepository } from "@nestjs/typeorm";
import { ChannelUsers, User, ChannelMessages, Channel } from 'src/database/entities';
import { LessThan, Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import IChannelMessagesRepository from "./repositories_interfaces/channel-mesages.repositoory.interface";

import {LIMIT_MESSAGES} from '../../global/constants/constants'

@Injectable()
class ChannelMessagesRepository extends ABaseRepository<ChannelMessages> implements IChannelMessagesRepository
{
  constructor(
    @InjectRepository(ChannelMessages)
    protected entity: Repository<ChannelMessages>,
  ) {
    super();
  }

  async getChannelMessages(channel : Channel, date ?: Date) : Promise <ChannelMessages[] | undefined> {
    const condition : any = {
        channel,
    };
    if (date)
      condition.time = LessThan(date);
  
    return this.entity.find({
      where: condition,
      order: { 'time': 'DESC' }, // Order by the "name" column in ascending order
      take : LIMIT_MESSAGES,
      relations: ['user']
    })
  }
}

export default ChannelMessagesRepository;