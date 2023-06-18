import { Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from 'src/database/entities';

@Controller('users/me/notification')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService
        ){}

    @Get()
    getNotifactions(@GetUser() user : User){
        return this.notificationService.getNotifactions(user);
    };

}
