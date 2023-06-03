"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const fortytwo_strategy_1 = require("../strategy/fortytwo.strategy");
const auth_controller_1 = require("./auth.controller");
(0, common_1.Module)({
    imports: [
        jwt_1.JwtModule.register({
            secret: 'helloWorld',
            signOptions: { expiresIn: '60s' },
        }),
        passport_1.PassportModule.register({
            defaultStrategy: '42'
        }),
    ],
    controllers: [auth_controller_1.AuthController],
    providers: [auth_service_1.AuthService, jwt_1.JwtModule, fortytwo_strategy_1.FortyTwoStrategy],
});
class AuthModule {
}
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map