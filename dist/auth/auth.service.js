"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)({});
class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createUser(userDto) {
        const payload = { sub: userDto.id, username: userDto.username };
        return ({
            access_token: await this.jwtService.signAsync(payload),
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map