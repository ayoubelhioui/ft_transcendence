import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { BlockedUsersRepository, GamesRepository, UserRepository } from '../repositories';


@Module({
  controllers: [GameController],
  providers: [
    GameService
    , {
    provide : "GamesRepository",
    useClass : GamesRepository
  },
  {
    provide : "UserRepository",
    useClass : UserRepository
  },
  {
    provide : "BlockedUsersRepository",
    useClass : BlockedUsersRepository
  }
  ]
})
export class GameModule {}
