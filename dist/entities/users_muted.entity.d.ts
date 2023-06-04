import { User, Channel } from './index';
declare class UsersMuted {
    id: number;
    channel: Channel;
    user: User;
    expirationTime: Date;
}
export default UsersMuted;
