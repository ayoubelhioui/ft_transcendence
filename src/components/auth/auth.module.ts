import { Controller, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt"
import { jwtConstants } from "./auth.constants";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { FortyTwoStrategy } from "src/components/auth/strategy/fortytwo.strategy";
import { AuthController } from "./auth.controller";
import { JoinTable } from "typeorm"
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [
        JwtModule.register({}),
        PassportModule.register({
            defaultStrategy: '42',
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, FortyTwoStrategy],
})
export class AuthModule{}
