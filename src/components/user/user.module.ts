import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/entities';
import UserRepository from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UserService,
        {
            provide: 'MyUserRepository',
            useClass: UserRepository
        }
    ],
    controllers: [UserController]
})

export class UserModule{ }