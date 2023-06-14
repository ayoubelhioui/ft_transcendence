import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRequestsController } from './friend_requests.controller';
import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers, Friends, User } from 'src/database/entities';


@Module({
    imports: [
      TypeOrmModule.forFeature([User, BlockedUsers, Friends]),
    ],
  providers: [FriendsService, {
    provide : "MyFriendsRepository",
    useClass : FriendsRepository
  },
  {
    provide : "MyUserRepository",
    useClass : UserRepository
  },
  {
    provide : "MyBlockedUsersRepository",
    useClass : BlockedUsersRepository
  }
],
  controllers: [FriendsController, FriendRequestsController],
  exports: [FriendsService]
})
export class FriendsModule {}
