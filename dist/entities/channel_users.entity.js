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
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
var channelUserRole;
(function (channelUserRole) {
    channelUserRole[channelUserRole["owner"] = 0] = "owner";
    channelUserRole[channelUserRole["admin"] = 1] = "admin";
    channelUserRole[channelUserRole["member"] = 2] = "member";
})(channelUserRole || (channelUserRole = {}));
let ChannelUsers = class ChannelUsers {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChannelUsers.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user' }),
    (0, typeorm_1.ManyToOne)(() => index_1.User, user => user.channelUsers, { cascade: true }),
    __metadata("design:type", index_1.User)
], ChannelUsers.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'channel' }),
    (0, typeorm_1.ManyToOne)(() => index_1.Channel, channel => channel.channelUsers, { cascade: true }),
    __metadata("design:type", index_1.Channel)
], ChannelUsers.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChannelUsers.prototype, "userRole", void 0);
ChannelUsers = __decorate([
    (0, typeorm_1.Entity)()
], ChannelUsers);
exports.default = ChannelUsers;
//# sourceMappingURL=channel_users.entity.js.map