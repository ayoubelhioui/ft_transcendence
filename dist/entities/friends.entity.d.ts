import { User } from './index';
declare enum friendRequestStatus {
    pending = 0,
    accepted = 1,
    refused = 2
}
declare class Friends {
    id: number;
    status: friendRequestStatus;
    request_time: Date;
    accepted_time: Date;
    sender: User;
    receiver: User;
}
export default Friends;
