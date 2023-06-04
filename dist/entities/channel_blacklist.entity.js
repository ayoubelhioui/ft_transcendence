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
let ChannelBlacklist = class ChannelBlacklist {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChannelBlacklist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.Channel, (channel) => channel.channelMessages, { cascade: true }),
    __metadata("design:type", index_1.Channel)
], ChannelBlacklist.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, (user) => user.channelMessages, { cascade: true }),
    __metadata("design:type", index_1.User)
], ChannelBlacklist.prototype, "user", void 0);
ChannelBlacklist = __decorate([
    (0, typeorm_1.Entity)()
], ChannelBlacklist);
exports.default = ChannelBlacklist;
//# sourceMappingURL=channel_blacklist.entity.js.map