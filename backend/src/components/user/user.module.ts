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
