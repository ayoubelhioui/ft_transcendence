import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as cookieParser from 'cookie-parser';
import { Achievement, BlockedUsers, Channel, ChannelBlacklist, ChannelMessages, ChannelUsers, Friends, LiveGames, MatchHistory, Notification, UsersMuted } from 'src/database/entities';
import User from 'src/database/entities/user.entity';
import { AuthModule } from './components/auth/auth.module';
import TokenBlacklist from './database/entities/token_blacklist';
import { UserModule } from './components/user/user.module';

const ENV_PATH : string = './src/.env'; 
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    TypeOrmModule.forRootAsync({
      imports: [AuthModule, ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:     'postgres',
        host:     configService.get('DB_HOST'), 
        port:     +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASS'), 
        database: configService.get('DB_NAME'),
        entities:       [User, Achievement, Channel, Friends, ChannelMessages, ChannelBlacklist, BlockedUsers, ChannelUsers, LiveGames, MatchHistory, Notification, UsersMuted, TokenBlacklist],
        synchronize:    true,
        autoSchemaSync: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [], 
})


export class AppModule{}
