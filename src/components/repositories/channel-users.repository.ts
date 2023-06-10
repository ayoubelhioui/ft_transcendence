import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelUsersRepository } from "./repositories_interfaces";
import { ChannelUserRole } from "../channels/types/channel-user-roles";

@Injectable()
class ChannelUsersRepository extends ABaseRepository<ChannelUsers> implements IChannelUsersRepository
{
  constructor(
    @InjectRepository(ChannelUsers)
    protected entity: Repository<ChannelUsers>,
  ) {
    super();
  }

 
  async addUserToChannel(channel : Channel ,user : User, role : ChannelUserRole =  ChannelUserRole.member) : Promise < ChannelUsers | undefined > {

    let channelUsers : ChannelUsers = new ChannelUsers();
    channelUsers.user = user;
    channelUsers.userRole = role;
    channelUsers.channel = channel;

    return (this.entity.save(channelUsers));
  }
}

export default ChannelUsersRepository;