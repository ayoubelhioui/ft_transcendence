import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt"
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { FortyTwoStrategy } from "src/strategy/fortytwo.strategy";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities";
import { UserModule } from "src/components/user/user.module";
import TokenBlacklist from "src/database/entities/token_blacklist";
import { PasswordService } from "../channels/password.service";
import { TokenValidationMiddleware } from "./middlewares/acces-token.middleware";
import { GoogleStrategy } from "./google.strategy";

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
    providers: [AuthService, JwtService, FortyTwoStrategy, PasswordService, GoogleStrategy],
    exports : [AuthService]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      // Register the global middleware here
      consumer.apply(TokenValidationMiddleware)
      .exclude(
        // Add the routes you want to exclude from the middleware
        { path: 'auth/callback', method: RequestMethod.GET },
        { path: 'auth/two-factors-verify', method: RequestMethod.POST },
        { path: 'auth/two-factors', method: RequestMethod.POST },
        { path: 'users/image/:id*', method: RequestMethod.ALL },
        { path: 'auth/google/callback', method: RequestMethod.ALL },
        { path: 'auth/google', method: RequestMethod.ALL },
        
        // More routes can be excluded if needed
      ).forRoutes('*');
    }
  }

  