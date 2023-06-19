import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import TokenBlacklist from "src/entities/token_blacklist";
import { UserController } from "./user.controller";
import { User } from "src/entities";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([TokenBlacklist, User])],
    controllers: [UserController],
    providers: [UserService, JwtService, AuthService],
    exports : [UserService]
})

export class UserModule{}
