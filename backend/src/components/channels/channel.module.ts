import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement, Channel, ChannelBlacklist, ChannelInvites, ChannelMessages, ChannelUsers, User, UsersMuted } from 'src/database/entities';
import ChannelRepository from '../repositories/channel.repository';
import { UserModule } from '../user/user.module';
import { ValidationPasswordPipe } from './pipe/validation-password.pipe';
import { PasswordService } from './password.service';
import { ChannelUsersRepository, UserRepository } from '../repositories';
import { ChannelExistsGuard } from './guards/channel-exists.guard';
import { ChannelRolesGuard } from './guards/channel-roles.guard';
import { UserNotInChannelGuard } from './guards/user-not-in-channel.guard';
import { ValidationPasswordMiddleware } from './middlewares/validation-password.middleware';
import ChannelBlacklistRepository from '../repositories/channel-blacklist.repository';
import { TargetedUserInChannelGuard } from './guards/targeted-user-in-channel.guard';
import UsersMutedRepository from '../repositories/users-muted.repository';
import { UserInChannelGuard } from './guards/user-in-channel.guard';
import { PrivateChannelGuard } from './guards/private-channel.guard';
import ChannelMessagesRepository from '../repositories/channel-messages.repository';
import { BlacklistedGuard } from './guards/blacklisted.guard';
import { GroupGuard } from './guards/group.guard';
import { ChannelGateway } from './channel.gateway';
import { SocketModule } from '../socket/socket.module';
import { UserMutedGuard } from './guards';
import { FriendsService } from '../friends/friends.service';
import { UserService } from '../user/user.service';
import { FriendsModule } from '../friends/friends.module';
import TokenBlacklist from 'src/database/entities/token_blacklist';
import { AchievementModule } from '../achievement/achievement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, User, ChannelUsers, ChannelBlacklist,Achievement ,UsersMuted, ChannelMessages, ChannelInvites,TokenBlacklist]),
    SocketModule,
    forwardRef(() => UserModule),
    forwardRef(() => FriendsModule),
    AchievementModule
  ],
  providers: [
    ChannelService,
    PasswordService,
    UserService,
    {
      provide: 'MyChannelRepository',
      useClass: ChannelRepository
    },
    {
      provide: 'MyChannelUsersRepository',
      useClass: ChannelUsersRepository
    },
    {
      provide: 'MyChannelBlacklistRepository',
      useClass: ChannelBlacklistRepository
    },
    {
      provide: 'MyUsersMutedRepository',
      useClass: UsersMutedRepository
    },
    {
      provide: 'MyUserRepository',
      useClass: UserRepository
    },
    {
      provide: 'MyChannelMessagesRepository',
      useClass: ChannelMessagesRepository
    },
    ValidationPasswordPipe, 
    /********************** GUARD *************/
    ChannelExistsGuard,
    ChannelRolesGuard,
    GroupGuard,
    UserInChannelGuard,
    TargetedUserInChannelGuard,
    UserNotInChannelGuard,
    PrivateChannelGuard,
    BlacklistedGuard,
    ChannelGateway
  ],
  controllers: [ChannelController],
  exports : [ChannelService, ChannelExistsGuard, UserInChannelGuard]
})
export class ChannelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationPasswordMiddleware)
      .forRoutes(
        { path: 'channels', method: RequestMethod.POST },
        { path: 'channels/:id', method: RequestMethod.PUT },
    );
  }
}