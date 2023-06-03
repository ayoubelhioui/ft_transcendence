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
const channel_entity_1 = require("./channel.entity");
const index_1 = require("./index");
let ChannelMessages = class ChannelMessages {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChannelMessages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, (user) => user.channelMessages, { cascade: true }),
    __metadata("design:type", index_1.User)
], ChannelMessages.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => channel_entity_1.default, (channel) => channel.channelMessages, { cascade: true }),
    __metadata("design:type", channel_entity_1.default)
], ChannelMessages.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChannelMessages.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ChannelMessages.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], ChannelMessages.prototype, "seen", void 0);
ChannelMessages = __decorate([
    (0, typeorm_1.Entity)()
], ChannelMessages);
exports.default = ChannelMessages;
//# sourceMappingURL=channel_messages.entity.js.map