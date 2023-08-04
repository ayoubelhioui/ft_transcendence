import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites, Achievement } from 'src/database/entities';
import UserRepository from '../repositories/user.repository';
import { TargetUserExistGuard } from './guards/target-user-exists.guard';
import { ChannelModule } from '../channels/channel.module';
import { ChannelUsersRepository } from '../repositories';
import TokenBlacklist from 'src/database/entities/token_blacklist';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { GameModule } from '../game/game.module';
import { TargetUserSpecialCaseGuard } from './guards/target-user-special-case-guard';
import { FriendsModule } from '../friends/friends.module';
import { AchievementModule } from '../achievement/achievement.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, ChannelUsers, TokenBlacklist,Achievement, ]),
        forwardRef(() => ChannelModule),
        forwardRef(() => AuthModule),
        forwardRef(() => GameModule),
        forwardRef(() => FriendsModule),
        AchievementModule,
        JwtModule
    ],
    providers: [
        UserService,
        TargetUserSpecialCaseGuard,
        TargetUserExistGuard,
        {
            provide: 'MyUserRepository',
            useClass: UserRepository
        },
        {
            provide: 'MyChannelUsersRepository',
            useClass: ChannelUsersRepository
         },
         {
            provide : "TokenBlacklist",
            useClass: TokenBlacklist
         }
    ],
    controllers: [UserController],
    exports: [UserService, TargetUserExistGuard, TargetUserSpecialCaseGuard]
})

export class UserModule{ }

