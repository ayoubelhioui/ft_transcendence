import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import  {User}  from '../entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [ ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: "postgres",
            // username: configService.get('DB_USERNAME'),
            password: "ayoub",
            // password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
            entities: [ User ],
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User]),
    ],
    exports :[ TypeOrmModule ],
    providers: [ UserService ],
    controllers: [ UserController ],
})

export class UserModule{ }