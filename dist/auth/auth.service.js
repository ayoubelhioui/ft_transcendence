"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)({});
class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map