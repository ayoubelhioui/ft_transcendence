"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./auth.constants");
const auth_service_1 = require("./auth.service");
(0, common_1.Module)({
    imports: [
        jwt_1.JwtModule.register({
            secret: auth_constants_1.jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        })
    ],
    providers: [auth_service_1.AuthService]
});
class AuthModule {
}
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map