"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const user_entity_1 = require("./entities/user.entity");
const auth_module_1 = require("./auth/auth.module");
const ENV_PATH = './src/.env';
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [auth_module_1.AuthModule, config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    entities: [user_entity_1.default, entities_1.Achievement, entities_1.Channel, entities_1.Friends, entities_1.ChannelMessages, entities_1.ChannelBlacklist, entities_1.BlockedUsers, entities_1.ChannelUsers, entities_1.LiveGames, entities_1.MatchHistory, entities_1.Notification, entities_1.UsersMuted],
                    synchronize: true,
                    autoSchemaSync: true,
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map