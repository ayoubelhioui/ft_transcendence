import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites } from 'src/database/entities';
import UserRepository from '../repositories/user.repository';
import { TargetUserExistGuard } from './guards/target-user-exists.guard';
import { ChannelModule } from '../channels/channel.module';
import { ChannelUsersRepository } from '../repositories';
import TokenBlacklist from 'src/database/entities/token_blacklist';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, ChannelUsers, TokenBlacklist]),
        forwardRef(() => ChannelModule),
        forwardRef(() => AuthModule),
        JwtModule
    ],
    providers: [
        UserService,
        
        TargetUserExistGuard,
        {
            provide: 'MyUserRepository',
            useClass: UserRepository
        },
        {
            provide: 'MyChannelUsersRepository',
            useClass: ChannelUsersRepository
         },
    ],
    controllers: [UserController],
    exports: [UserService, TargetUserExistGuard]
})

export class UserModule{ }

