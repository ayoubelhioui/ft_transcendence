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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const token_blacklist_1 = require("../entities/token_blacklist");
let UserService = class UserService {
    constructor(userRepository, tokenBlacklistRepository) {
        this.userRepository = userRepository;
        this.tokenBlacklistRepository = tokenBlacklistRepository;
    }
    async createUser(createUserDto) {
        this.initializeUserDto(createUserDto);
        const newUser = await this.userRepository.save(createUserDto);
    }
    initializeUserDto(createUserDto) {
        createUserDto.avatar = 'this is just a test';
        createUserDto.winrate = 0;
        createUserDto.wins = 0;
    }
    async findUserById(IntraId) {
        const user = await this.userRepository.findOne({
            where: {
                IntraId: IntraId,
            },
        });
        return (user);
    }
    async addingTokensToBlacklist(tokensDto) {
        await this.tokenBlacklistRepository.save(tokensDto);
    }
    async refreshTokenInBlacklist(token) {
        return !!(await this.tokenBlacklistRepository.findOne({
            where: {
                refresh_token: token,
            },
        }));
    }
    async accessTokenInBlacklist(token) {
        return !!(await this.tokenBlacklistRepository.findOne({
            where: {
                access_token: token,
            },
        }));
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(token_blacklist_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map