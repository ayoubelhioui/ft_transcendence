import IBaseRepository from "./base/base.repository.interface";
import { Notification, User } from 'src/database/entities';


//TO ADD extra custom methods
interface INotificationRepository extends IBaseRepository<Notification>
{
    getUserNotifications(user : User, date? : Date) : Promise < Notification[] >;

}

export default INotificationRepository;