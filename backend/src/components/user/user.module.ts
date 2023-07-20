<<<<<<< HEAD
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
=======
import { Module } from "@nestjs/common";
import { UserService } from "src/components/user/user.service";
import TokenBlacklist from "src/database/entities/token_blacklist";
import { UserController } from "./user.controller";
import { User } from "src/database/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/components/auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([TokenBlacklist, User])],
    controllers: [UserController],
    providers: [UserService, JwtService, AuthService],
    exports : [UserService]
})

export class UserModule{}
>>>>>>> b36cea380faae77c18a8cf996efcb31e72927633
