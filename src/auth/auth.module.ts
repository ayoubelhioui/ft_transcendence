import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement, BlockedUsers, Channel, ChannelBlacklist, ChannelMessages, ChannelUsers, Friends, LiveGames, MatchHistory, Notification, UsersMuted } from 'src/entities';
import User from 'src/entities/user.entity';
// import  {User}  from '../entities/index';
// import { UserModule } from '../user/user.module';

@Module({
    imports: [],
    controllers: [],
    providers: [],
  })
  
export class AuthModule { }

// import { Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt"
// import { jwtConstants } from "./auth.constants";
// import { AuthService } from "./auth.service";
// Module({
//     imports: [
//         JwtModule.register({
//             secret: jwtConstants.secret,
//             signOptions: { expiresIn: '60s' },
//         }
//     )],
//     providers: [AuthService]
// })
// export class AuthModule{}