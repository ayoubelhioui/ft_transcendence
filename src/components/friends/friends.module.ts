import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRequestsController } from './friend_requests.controller';
import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';


@Module({
  providers: [FriendsService, {
    provide : "FriendsRepository",
    useClass : FriendsRepository
  },
  {
    provide : "UserRepository",
    useClass : UserRepository
  },
  {
    provide : "BlockedUsersRepository",
    useClass : BlockedUsersRepository
  }
],
  controllers: [FriendsController, FriendRequestsController]
})
export class FriendsModule {}
