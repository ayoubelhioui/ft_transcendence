import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/entities';
import UserRepository from '../repositories/user.repository';
import { TargetUserExistGuard } from './guards/target-user-exists.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UserService,
        TargetUserExistGuard,
        {
            provide: 'MyUserRepository',
            useClass: UserRepository
        }
    ],
    controllers: [UserController],
    exports: [UserService, TargetUserExistGuard]
})

export class UserModule{ }