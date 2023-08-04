import { Inject, Injectable } from '@nestjs/common';
import { AchievementRepository } from '../repositories/achievements.repository';
import { Achievement } from 'src/database/entities';

@Injectable()
export class AchievementService {

  constructor(
    @Inject("MyAchievementRepository") private readonly achievementRepository: AchievementRepository)
  {}

    async setInitialAchievements(achievements : Achievement[])
    {
      for(let i = 0; i < achievements.length ; i++)
      {
       await this.achievementRepository.create(achievements[i]);
      }
    }

    async getAchievement(id : number) {
      return await (this.achievementRepository.findOneById(id));
    }
 }
