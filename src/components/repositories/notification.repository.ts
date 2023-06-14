import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Notification, User } from 'src/database/entities';
import ABaseRepository from "./repositories_interfaces/base/base.repository.abstract";
import { INotificationRepository } from "./repositories_interfaces";




@Injectable()
export class NotificationRepository extends ABaseRepository<Notification> implements INotificationRepository
{
  constructor(
    @InjectRepository(Notification)
    protected entity: Repository<Notification>,
  ) {
    super();
  }

  async getUserNotifications(receiver: User, date?: Date): Promise<Notification[]> {
    const filterCondition: any = {
      receiver,
    };

    if (date) {
      filterCondition.time = LessThan(date);
    }

    return await this.entity.find({
      where: filterCondition,
      order: {
        time: 'DESC',
      },
      take: 10,
    });
  }


}