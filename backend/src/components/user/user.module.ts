import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites } from 'src/database/entities';
import UserRepository from '../repositories/user.repository';
import { TargetUserExistGuard } from './guards/target-user-exists.guard';
import { ChannelModule } from '../channels/channel.module';
import { ChannelUsersRepository } from '../repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, ChannelUsers]),
        forwardRef(() => ChannelModule),
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