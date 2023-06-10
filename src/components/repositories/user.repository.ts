import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities";
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
}

export default UserRepository;