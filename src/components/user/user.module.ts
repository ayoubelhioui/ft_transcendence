import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites } from 'src/database/entities';
import UserRepository from '../repositories/user.repository';
import { ChannelModule } from '../channels/channel.module';
import { ChannelUsersRepository } from '../repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([Channel, User, ChannelUsers, ChannelBlacklist, UsersMuted, ChannelMessages, ChannelInvites]),
        forwardRef(() => ChannelModule),
    ],
    providers: [
        UserService,
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
    exports: [UserService]
})

export class UserModule{ }