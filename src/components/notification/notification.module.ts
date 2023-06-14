import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from '../repositories';
import { Notification } from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  providers: [
    NotificationService,
    {
      provide : "MyNotificationRepository",
      useClass : NotificationRepository
    },
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
