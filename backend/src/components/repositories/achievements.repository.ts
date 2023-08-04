import { Injectable } from "@nestjs/common";
import ABaseRepository from "./repositories_interfaces/base/base.repository.abstract";
import { Achievement, Game } from "src/database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import IAchievementRepository from "./repositories_interfaces/achievements.repository.interface";

@Injectable()
export class AchievementRepository extends ABaseRepository<Achievement> implements IAchievementRepository
{
  constructor(
    @InjectRepository(Achievement)
    protected entity: Repository<Achievement>,
    ) {
    super();
  }
}