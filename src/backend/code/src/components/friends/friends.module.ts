import { Module, forwardRef } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendRequestsController } from './friend_requests.controller';
import { BlockedUsersRepository, FriendsRepository, UserRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedUsers, Friends, User } from 'src/database/entities';
import { UserModule } from '../user/user.module';
import { IsFriendGuard } from './guards/is-friend.guard';
import { NotificationModule } from '../notification/notification.module';
import { ChannelModule } from '../channels/channel.module';
import { SocketModule } from '../socket/socket.module';
import { FriendsGateway } from './friends.gateway';


@Module({
    imports: [
      TypeOrmModule.forFeature([User, BlockedUsers, Friends]),
      forwardRef(() => SocketModule),
      forwardRef(() =>  UserModule),
      NotificationModule,
      forwardRef(() => ChannelModule),
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
  },
  IsFriendGuard,
  FriendsGateway
],
  controllers: [FriendsController, FriendRequestsController],
  exports: [FriendsService]
})
export class FriendsModule {}
