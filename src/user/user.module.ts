import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/entities';
import { UserService } from './user.service';
import User from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';

@Module({
    imports: [
    //     TypeOrmModule.forRoot({
    //         type: 'postgres',
    //         host: '0.0.0.0',
    //         port: 5432,
    //         username: 'postgres',
    //         password: 'ayoub',
    //         database: 'mydb',
    //         entities: [User],
    //         synchronize: true
    //    }),
    //     TypeOrmModule.forFeature([User]),
        AuthModule,
    ],
    // exports: [TypeOrmModule],
    providers: [UserService, AuthService],
    controllers: [UserController, AuthController]
})

export class UserModule{ }