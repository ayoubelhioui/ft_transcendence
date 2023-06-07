import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfigs from './database/configs/db_configs';
import { UserModule } from './components/user/user.module';
import { GameModule } from './components/game/game.module';
import { ChatModule } from './components/chat/chat.module';
import { NotificationService } from './components/notification/notification.service';
import { NotificationModule } from './components/notification/notification.module';
import { GroupInvitesModule } from './components/group_invites/group_invites.module';
import { FriendsService } from './components/friends/friends.service';
import { FriendsModule } from './components/friends/friends.module';
import { ChannelsService } from './components/channels/channels.service';
import { ChannelsModule } from './components/channels/channels.module';

const ENV_PATH : string = './src/.env'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    TypeOrmModule.forRootAsync(typeOrmConfigs()),
    UserModule,
    GameModule,
    ChatModule,
    NotificationModule,
    GroupInvitesModule,
    FriendsModule,
    ChannelsModule,
  
    
  ],
  controllers: [],
  providers: [NotificationService, FriendsService, ChannelsService],
})

export class AppModule {}
