import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { MoreThan, Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { IChannelUsersRepository } from "./repositories_interfaces";
import { ChannelUserRole } from "../../global/types/channel-user-roles";

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
    return this.entity.createQueryBuilder('channelUsers')
    .select('channelUsers')
    .where('channelUsers.userId = :userId', { userId: user.id })
    .andWhere('channelUsers.channelId = :channelId', { channelId: channel.id })
    .getOne();
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

  async getUserChannelsWithLastMessage(userId : number) : Promise < any[] | undefined > {
    return this.entity
    .createQueryBuilder('channelUsers')
    .leftJoinAndSelect('channelUsers.channel', 'channel')
    .leftJoinAndSelect('channel.lastMessage', 'lastMessage')
    .leftJoinAndSelect('lastMessage.user', 'user')
    .where('channelUsers.userId = :id', { id: userId })
    .select(['channel.id', 'channel.name', 'channel.visibility', 'channel.isGroup'])
    .addSelect('lastMessage.id', 'lastMessage_id')
    .addSelect('lastMessage.message', 'lastMessage_message')
    .addSelect('lastMessage.time', 'lastMessage_time')
    .addSelect('lastMessage.seen', 'lastMessage_seen')
    .addSelect('user.id', 'user_id')
    .addSelect('user.username', 'user_username')
    .addSelect('user.avatar', 'user_avatar')
    .orderBy('lastMessage.time', 'DESC')
    .getRawMany()
    .then(results => {
      // Transform the raw results to the desired output structure
      return results.map(result => {
        const channel: any = {
          id: result.channel_id,
          name: result.channel_name,
          visibility: result.channel_visibility,
          isGroup: result.channel_isGroup
        };

        if (result.lastMessage_id) {
          channel.lastMessage = {
            id: result.lastMessage_id,
            message: result.lastMessage_message,
            time: result.lastMessage_time,
            seen: result.lastMessage_seen,
            user : {
              userId : result.user_id,
              username : result.user_username,
              avatar : result.user_avatar
            }
          };
        }
        return channel;
      });
    });
  }


  async getUserChannelsId(userId : number) : Promise < any[] | undefined > {
    return this.entity
    .createQueryBuilder('channelUsers')
    .leftJoinAndSelect('channelUsers.channel', 'channel')
    .where('channelUsers.userId = :id', { id: userId })
    .select('channel.id', 'id')
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