import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from '../repositories';

@Module({
  providers: [
    NotificationService,
    {
      provide : "NotificationRepository",
      useClass : NotificationRepository
    },
  ],
  controllers: [NotificationController]
})
export class NotificationModule {}
