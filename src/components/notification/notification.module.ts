import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from '../repositories';
import { Notification } from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationGateway } from './notification.gateway';
import { SocketModule } from '../socket/socket.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([Notification]),
    forwardRef(() => SocketModule)
  ],
  providers: [
    NotificationService,
    NotificationGateway,
    {
      provide : "MyNotificationRepository",
      useClass : NotificationRepository
    },
  ],
  controllers: [NotificationController],
  exports : [NotificationService]
})
export class NotificationModule {}
