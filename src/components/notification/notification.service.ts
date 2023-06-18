import { Inject, Injectable } from '@nestjs/common';
import { Notification, User } from 'src/database/entities';
import { NotificationDto } from './dto/notification.dto';
import { INotificationRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
    constructor(
        @Inject("MyNotificationRepository") private readonly notificationRepository : INotificationRepository,
        private readonly notificationGateway : NotificationGateway
        ){}

    async createNotification(notificationDto :NotificationDto, sender: User ,receiver: User)
    {
        const createNotification = await this.notificationRepository.create({
            ...notificationDto,
            time : new Date(),
            seen : false,
            sender, 
            receiver
        });
        await this.notificationGateway.sendNotification(receiver , createNotification);
        return (createNotification);
    };

    async getNotifactions(user : User, date? : Date)
    {
        if(date)
            return this.notificationRepository.getUserNotifications(user,date);
        else
            return this.notificationRepository.getUserNotifications(user);

    };

    //check i notification exits guard?
    async setNotificationSeen(notification :Notification) 
    {
        return this.notificationRepository.update({
            where :{
                id : notification.id
            }
        },{seen : true});
    };


}
