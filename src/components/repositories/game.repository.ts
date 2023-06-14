import { Injectable } from "@nestjs/common";
import ABaseRepository from "./repositories_interfaces/base/base.repository.abstract";
import { MatchHistory } from "src/database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IGamesRepository } from "./repositories_interfaces";

@Injectable()
export class GamesRepository extends ABaseRepository<MatchHistory> implements IGamesRepository
{
  constructor(
    @InjectRepository(MatchHistory)
    protected entity: Repository<MatchHistory>,
    ) {
    super();
  }
}