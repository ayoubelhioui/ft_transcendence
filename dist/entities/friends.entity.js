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
var friendRequestStatus;
(function (friendRequestStatus) {
    friendRequestStatus[friendRequestStatus["pending"] = 0] = "pending";
    friendRequestStatus[friendRequestStatus["accepted"] = 1] = "accepted";
    friendRequestStatus[friendRequestStatus["refused"] = 2] = "refused";
})(friendRequestStatus || (friendRequestStatus = {}));
let Friends = class Friends {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Friends.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Friends.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Friends.prototype, "request_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Friends.prototype, "accepted_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, (user) => user.sentFriends),
    __metadata("design:type", index_1.User)
], Friends.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => index_1.User, (user) => user.receivedFriends),
    __metadata("design:type", index_1.User)
], Friends.prototype, "receiver", void 0);
Friends = __decorate([
    (0, typeorm_1.Entity)()
], Friends);
exports.default = Friends;
//# sourceMappingURL=friends.entity.js.map