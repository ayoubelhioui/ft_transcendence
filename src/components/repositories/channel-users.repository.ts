import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { MoreThan, Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelUsersRepository } from "./repositories_interfaces";
import { ChannelUserRole } from "../../global/types/channel-user-roles";
import { channel } from 'diagnostics_channel';

@Injectable()
class ChannelUsersRepository extends ABaseRepository<ChannelUsers> implements IChannelUsersRepository
{
  constructor(
    @InjectRepository(ChannelUsers)
    protected entity: Repository<ChannelUsers>,
  ) {
    super();
  }

 
  async addUserToChannel(user : User, channel : Channel, role : ChannelUserRole = ChannelUserRole.member) : Promise < ChannelUsers | undefined > {

    let channelUsers : ChannelUsers = new ChannelUsers();
    channelUsers.user = user;
    channelUsers.userRole = role;
    channelUsers.channel = channel;

    return (this.entity.save(channelUsers));
  }

  async isUserInChannel(user: User, channel : Channel) : Promise <ChannelUsers | undefined> {
    const condition : any = {
      user, 
      channel
    };
    return (this.findOneByCondition(condition));
  }

  async getNextOwner( channel : Channel, prevOwnerId : number) : Promise<ChannelUsers | undefined> {
    return  this.entity.findOne({
      where: {
        id : MoreThan(prevOwnerId),
        channel
      },
      order: { id: 'ASC' },
      relations : ['user']
    });
  }

  async  setNextOwner(nextOwner: ChannelUsers) : Promise<ChannelUsers | undefined> {
    nextOwner.userRole = ChannelUserRole.owner;
    return (this.save(nextOwner));
  }

  async getUserChannels(userId : number) : Promise < Channel[] | undefined > {
    return this.entity
    .createQueryBuilder('channelUsers')
    .leftJoinAndSelect('channelUsers.channel', 'channel')
    .where('channelUsers.userId = :id', { id: userId })
    .select('channel.id', 'id')
    .addSelect('channel.name', 'name')
    .addSelect('channel.visibility', 'visibility')
    .addSelect('channel.isGroup', 'isGroup')
    .getRawMany()
  }


  async getChannelUsers(channelId : number) : Promise < User[] | undefined > {
    return this.entity
    .createQueryBuilder('channelUsers')
    .leftJoinAndSelect('channelUsers.user', 'user')
    .where('channelUsers.channelId = :id', { id: channelId })
    .select('user.id', 'id')
    .addSelect('user.avatar', 'avatar')
    .addSelect('user.username', 'username')
    .addSelect('user.wins', 'wins')
    .addSelect('user.loss', 'loss')
    .getRawMany()
  }

}

export default ChannelUsersRepository;