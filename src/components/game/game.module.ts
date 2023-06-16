import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { BlockedUsersRepository, GamesRepository, UserRepository } from '../repositories';
import { FriendsModule } from '../friends/friends.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers, MatchHistory, User } from 'src/database/entities';
import { GameExistsGuard } from './guards/game-exists.guard';


@Module({
  imports: [
    FriendsModule,
    TypeOrmModule.forFeature([MatchHistory, User, BlockedUsers]),
  ],
  controllers: [GameController],
  providers: [
    GameService, 
    {
      provide : "MyGamesRepository",
      useClass : GamesRepository
    },
    {
      provide : "MyUserRepository",
      useClass : UserRepository
    },
    {
      provide : "MyBlockedUsersRepository",
      useClass : BlockedUsersRepository
    },
    /*** guards */
    GameExistsGuard
  ],
})
export class GameModule {}
