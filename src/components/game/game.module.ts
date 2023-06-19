import { Module, forwardRef } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { BlockedUsersRepository, GamesRepository, UserRepository } from '../repositories';
import { FriendsModule } from '../friends/friends.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers, Game, User } from 'src/database/entities';
import { GameExistsGuard } from './guards/game-exists.guard';
import { GameGateway } from './game.gateway';
import { SocketModule } from '../socket/socket.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    forwardRef(() => SocketModule),
    FriendsModule,
    TypeOrmModule.forFeature([Game, User, BlockedUsers]),
    forwardRef(() => UserModule),
    JwtModule.register({}),
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
    GameExistsGuard,
    GameGateway
  ],
  exports : [GameService]
})
export class GameModule {}
