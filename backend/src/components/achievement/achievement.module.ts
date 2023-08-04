import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementRepository } from '../repositories/achievements.repository';
import { Achievement } from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Achievement])],
  providers: [AchievementService,
    {
      provide : "MyAchievementRepository",
      useClass : AchievementRepository
    }
  ],
  exports : [AchievementService]
})
export class AchievementModule {}
