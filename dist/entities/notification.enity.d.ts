import { User } from './index';
declare class Notification {
    id: number;
    message: string;
    link: string;
    time: Date;
    seen: boolean;
    receiver: User;
    sender: User;
}
export default Notification;
