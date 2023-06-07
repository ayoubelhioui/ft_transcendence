"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
require('dotenv').config();
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async authenticateUser(userDto) {
        this.payload = { sub: userDto.IntraId, username: userDto.username };
        this.userService.createUser(userDto);
        return ({
            refresh_token: await this.generateNewToken('10d'),
            access_token: await this.generateNewToken('10m')
        });
    }
    async generateNewToken(expiringTime) {
        return (await this.jwtService.signAsync(this.payload, {
            expiresIn: expiringTime,
            secret: process.env.ACCESS_TOKEN_SECRET,
        }));
    }
    async findUserById(intraId) {
        return (await this.userService.findUserById(intraId));
    }
    isRefreshTokenValid(refreshToken) {
        return (true);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map