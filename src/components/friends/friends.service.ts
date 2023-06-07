import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities';

@Injectable()
export class FriendsService {
    getFriends(userId  : Number){};
    getOnlineFriends(userId  : Number){};
    requestFriend(){};
    acceptFriend(){};
    deleteFriend(){};
    refuseFriend(){};
    blockFriend(){};
    isFriend (userId  : Number, friendId: number) : boolean {
        return (false);
    };
}
