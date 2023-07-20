import { InjectRepository } from "@nestjs/typeorm";
import { Channel, ChannelUsers, User } from "src/database/entities";
import { IUserRepository } from "src/components/repositories/repositories_interfaces";
import { Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
class UserRepository extends ABaseRepository<User> implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    protected entity: Repository<User>,
  ) {
    super();
  }

  async fetchTwoUsers(user1Id: number, user2Id: number) {
      const users = await this.entity.createQueryBuilder('Game')
        .where('user.id IN (:ids)', { ids: [user1Id, user2Id] })
        .getMany();
    
      const [user1, user2] = users;
    
      if (!user1 || !user2) {
        throw new Error('Invalid sender or receiver ID');
      }
      return ({
          user1,user2
      })
  }
}

export default UserRepository;