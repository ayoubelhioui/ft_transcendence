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
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "loss", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "winrate", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => index_1.Achievement, achievement => achievement.users),
    __metadata("design:type", Array)
], User.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.MatchHistory, (matchHisory) => matchHisory.player1),
    __metadata("design:type", Array)
], User.prototype, "matchHistoryPlayer1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.MatchHistory, (matchHisory) => matchHisory.player2),
    __metadata("design:type", Array)
], User.prototype, "matchHistoryPlayer2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.Channel, (channel) => channel.owner),
    __metadata("design:type", Array)
], User.prototype, "channels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.ChannelMessages, (channelMessages) => channelMessages.user),
    __metadata("design:type", Array)
], User.prototype, "channelMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.ChannelUsers, (channelUsers) => channelUsers.user),
    __metadata("design:type", Array)
], User.prototype, "channelUsers", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map