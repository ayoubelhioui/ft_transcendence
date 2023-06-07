import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRequestsController } from './friend_requests.controller';


@Module({
  providers: [FriendsService],
  controllers: [FriendsController, FriendRequestsController]
})
export class FriendsModule {}
