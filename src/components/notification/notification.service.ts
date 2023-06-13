import { Inject, Injectable } from '@nestjs/common';
import { Notification, User } from 'src/database/entities';
import { NotificationDto } from './dto/notification.dto';
import { INotificationRepository, IUserRepository } from '../repositories/repositories_interfaces';

@Injectable()
export class NotificationService {
    constructor(
        @Inject("NotificationRepository") private readonly notificationRepository : INotificationRepository
        ){}

    async createNotification(notificationDto :NotificationDto, sender: User ,receiver: User)
    {
        const {message, link} = notificationDto;
        this.notificationRepository.create({
            message,link, time : new Date(),seen : false,sender, receiver
        })
    };

    async getNotifactions(user : User, date? : Date)
    {
        if(date)
            this.notificationRepository.getUserNotifications(user,date);
        else
            this.notificationRepository.getUserNotifications(user);

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
