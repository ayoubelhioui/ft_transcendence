import { Injectable } from "@nestjs/common";
import ABaseRepository from "./repositories_interfaces/base/base.repository.abstract";
import { Game } from "src/database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IGamesRepository } from "./repositories_interfaces";

@Injectable()
export class GamesRepository extends ABaseRepository<Game> implements IGamesRepository
{
  constructor(
    @InjectRepository(Game)
    protected entity: Repository<Game>,
    ) {
    super();
  }
}