import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement, BlockedUsers, Channel, ChannelBlacklist, ChannelMessages, ChannelUsers, Friends, LiveGames, MatchHistory, Notification, UsersMuted } from 'src/entities';
import User from 'src/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

const ENV_PATH : string = './src/.env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:     'postgres',
        host:     configService.get('DB_HOST'),
        port:     +configService.get('DB_PORT'),
        username: configService.get('DB_USERNMAE'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),


        entities:       [User, Achievement, Channel, Friends, ChannelMessages, ChannelBlacklist, BlockedUsers, ChannelUsers, LiveGames, MatchHistory, Notification, UsersMuted],
        synchronize:    true,
        autoSchemaSync: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
