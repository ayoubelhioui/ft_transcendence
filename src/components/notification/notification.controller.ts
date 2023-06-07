import { Controller, Get, Post } from '@nestjs/common';

@Controller('users/me/notification')
export class NotificationController {

    @Post(':receiverId')
    createNotification(){};

    @Get()
    getNotifactions(){};

}
