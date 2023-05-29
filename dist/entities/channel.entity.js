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
var ChannelsVisibility;
(function (ChannelsVisibility) {
    ChannelsVisibility[ChannelsVisibility["private"] = 0] = "private";
    ChannelsVisibility[ChannelsVisibility["public"] = 1] = "public";
    ChannelsVisibility[ChannelsVisibility["protected"] = 2] = "protected";
})(ChannelsVisibility || (ChannelsVisibility = {}));
;
let Channel = class Channel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, (user) => user.channels),
    __metadata("design:type", index_1.User)
], Channel.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Channel.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.ChannelMessages, (channelMessages) => channelMessages.channel),
    __metadata("design:type", Array)
], Channel.prototype, "channelMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => index_1.ChannelUsers, (channelUsers) => channelUsers.channel),
    __metadata("design:type", Array)
], Channel.prototype, "channelUsers", void 0);
Channel = __decorate([
    (0, typeorm_1.Entity)()
], Channel);
exports.default = Channel;
//# sourceMappingURL=channel.entity.js.map