import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ABaseRepository from "src/components/repositories/repositories_interfaces/base/base.repository.abstract";
import { Injectable } from "@nestjs/common";
import { BlockedUsers } from "src/database/entities";
import { IBlockedUsersRepository } from "./repositories_interfaces";


@Injectable()
class BlockedUsersRepository extends ABaseRepository<BlockedUsers> implements IBlockedUsersRepository
{
  constructor(
    @InjectRepository(BlockedUsers)
    protected entity: Repository<BlockedUsers>,
  ) {
    super();
  }

 

}

export default BlockedUsersRepository;