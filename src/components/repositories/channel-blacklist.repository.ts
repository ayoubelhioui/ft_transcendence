import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelBlacklist, User } from "src/database/entities";
import {  Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelBlacklistRepository } from "./repositories_interfaces";

@Injectable()
class ChannelBlacklistRepository extends ABaseRepository<ChannelBlacklist> implements IChannelBlacklistRepository
{
  constructor(
    @InjectRepository(ChannelBlacklist)
    protected entity: Repository<ChannelBlacklist>,
  ) {
    super();
  }

  async isUserBlacklisted(user : User, channel : Channel) : Promise <Boolean> {
    console.log(user);
    console.log(channel);
    const condition = {user, channel};
    const isUserInChannelBlacklist = await this.findOneByCondition(condition);
    console.log(isUserInChannelBlacklist);


    return (isUserInChannelBlacklist != undefined)
  }
}

export default ChannelBlacklistRepository;