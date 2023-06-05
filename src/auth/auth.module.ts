import { Controller, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./auth.constants";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { FortyTwoStrategy } from "src/strategy/fortytwo.strategy";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { User } from "src/entities";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ]),
        JwtModule.register({}),
        PassportModule.register({
            defaultStrategy: '42',
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, FortyTwoStrategy, UserService],
})
export class AuthModule{}
