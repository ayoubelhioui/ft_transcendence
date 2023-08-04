import { InjectRepository } from "@nestjs/typeorm";
import { Channel, User, UsersMuted} from "src/database/entities";
import {  Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import IUsersMutedRepository from "./repositories_interfaces/users-muted.repository.interface";
import { channel } from 'diagnostics_channel';

@Injectable()
class UsersMutedRepository extends ABaseRepository<UsersMuted> implements IUsersMutedRepository
{
  constructor(
    @InjectRepository(UsersMuted)
    protected entity: Repository<UsersMuted>,
  ) {
    super();
  }


  async muteMember(targetedMember : User, channel : Channel, dateMuteExpiration : Date) {
      const criteria = {
        user : targetedMember, 
        channel
    }
    const updatedResult = await this.update(criteria,{
        expirationTime: dateMuteExpiration
    });
    if (updatedResult.affected == 0)
    {
      await this.save({
        user : targetedMember,
        channel,
        expirationTime : dateMuteExpiration
      })
    }
  }

  async isUserMuted(user : User, channel : Channel) : Promise <boolean> {
    const condition = {
      user,
      channel
    }
    const userMuted : UsersMuted | undefined =  await
      this.entity
      .createQueryBuilder('userMuted')
      .where('userMuted.userId = :user', { user: condition.user.id })
      .andWhere('userMuted.channelId = :channel', { channel: condition.channel.id })
      .getOne();

    return (userMuted != null && userMuted.expirationTime > new Date());
  } 

  async getUserMuted(user : User, channel : Channel) : Promise <UsersMuted> {
    const condition = {
      user,
      channel
    }
    return await this.findOneByCondition(condition);
  } 
}

export default UsersMutedRepository;