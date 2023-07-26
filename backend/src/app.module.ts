import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfigs from './database/configs/db_configs';
import { UserModule } from './components/user/user.module';
import { GameModule } from './components/game/game.module';
import { ChatModule } from './components/chat/chat.module';
import { NotificationModule } from './components/notification/notification.module';
import { GroupInvitesModule } from './components/group_invites/group_invites.module';
import { FriendsModule } from './components/friends/friends.module';
import { ChannelModule } from './components/channels/channel.module';
import { SocketModule } from './components/socket/socket.module';
import { AuthModule } from './components/auth/auth.module';
import { AddBotMiddleware } from './global/middlewares/add-bot-user.middleware';

const ENV_PATH : string = './src/.env'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    TypeOrmModule.forRootAsync(typeOrmConfigs()),
    AuthModule,
    UserModule,
    ChannelModule,
    GameModule,
    ChatModule,
    NotificationModule,
    GroupInvitesModule,
    FriendsModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddBotMiddleware).forRoutes('*');
  }
}