import { Module } from '@nestjs/common';
import { GroupInvitesService } from './group_invites.service';
import { GroupInvitesController } from './group_invites.controller';
import { ChannelModule } from '../channels/channel.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites } from 'src/database/entities';
import ChannelInvitesRepository from '../repositories/channel-invites.repository';
import { ChannelBlacklistRepository, ChannelMessagesRepository, ChannelRepository, ChannelUsersRepository, UserRepository, UsersMutedRepository } from '../repositories';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports : [
    ChannelModule,
    UserModule,
    TypeOrmModule.forFeature([ User, ChannelUsers, ChannelInvites]),
    NotificationModule
  ],
  providers: [
    GroupInvitesService,
    {
      provide: 'MyChannelInvitesRepository',
      useClass: ChannelInvitesRepository
    },
    {
      provide: 'MyChannelUsersRepository',
      useClass: ChannelUsersRepository
    },
  ],
  controllers: [GroupInvitesController]
})
export class GroupInvitesModule {}
