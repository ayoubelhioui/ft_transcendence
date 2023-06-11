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
const db_configs_1 = require("./database/configs/db_configs");
const user_module_1 = require("./components/user/user.module");
const game_module_1 = require("./components/game/game.module");
const chat_module_1 = require("./components/chat/chat.module");
const notification_module_1 = require("./components/notification/notification.module");
const group_invites_module_1 = require("./components/group_invites/group_invites.module");
const friends_module_1 = require("./components/friends/friends.module");
const channel_module_1 = require("./components/channels/channel.module");
const add_default_user_middleware_1 = require("./global/middlewares/add-default-user.middleware");
const ENV_PATH = './src/.env';
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(add_default_user_middleware_1.AddUserMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
            typeorm_1.TypeOrmModule.forRootAsync((0, db_configs_1.default)()),
            user_module_1.UserModule,
            channel_module_1.ChannelModule,
            game_module_1.GameModule,
            chat_module_1.ChatModule,
            notification_module_1.NotificationModule,
            group_invites_module_1.GroupInvitesModule,
            friends_module_1.FriendsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map