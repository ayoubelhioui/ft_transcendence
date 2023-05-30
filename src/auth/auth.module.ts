// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import User from 'src/entities/user.entity';
// // import  {User}  from '../entities/index';
// import { UserModule } from 'src/user/user.module';

// @Module({
//     imports: [
//       ConfigModule.forRoot({ isGlobal: true }),
//       TypeOrmModule.forRootAsync({
//         imports: [ConfigModule],
//         useFactory: (configService: ConfigService) => ({
//           type: 'postgres',
//           host: configService.get('DB_HOST'),
//           port: +configService.get<number>('DB_PORT'),
//           username: "postgres",
//           // username: configService.get('DB_USERNAME'),
//           password: "ayoub",
//           // password: configService.get('DB_PASS'),
//           database: configService.get('test'),
//           entities: [ User ],
//           synchronize: true,
//         }),
//         inject: [ConfigService],
//       }),
//       UserModule,
//      ],
//     controllers: [],
//     providers: [],
//   })
  
// export class AuthModule { }

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./auth.constants";
import { AuthService } from "./auth.service";
Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }
    )],
    providers: [AuthService]
})
export class AuthModule{}