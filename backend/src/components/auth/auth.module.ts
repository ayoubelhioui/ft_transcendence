import { Module, forwardRef } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt"
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { FortyTwoStrategy } from "src/strategy/fortytwo.strategy";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities";
import { UserModule } from "src/components/user/user.module";
import TokenBlacklist from "src/database/entities/token_blacklist";

@Module({
    imports: [
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([
            User, TokenBlacklist
        ]),
        JwtModule.register({}),
        PassportModule.register({
            defaultStrategy: '42',
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtService, FortyTwoStrategy],
    exports : [AuthService]
})
export class AuthModule{}
