import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from 'src/database/entities';
import { TokenValidationGuard } from '../auth/guards/acces-token.guard';

@Controller('users/me/notification')
// @UseGuards(TokenValidationGuard)

export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService
        ){}

    @Get()
    getNotifactions(@GetUser() user : User){
        return this.notificationService.getNotifactions(user);
    };

}
