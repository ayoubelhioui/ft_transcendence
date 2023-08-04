import { CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/database/entities';
import { FriendsService } from '../friends.service';


//needs targetedUser and user set
@Injectable()
export class IsFriendGuard implements CanActivate {

  constructor(
  private readonly friendService : FriendsService,
) {};

  async canActivate(
    context: ExecutionContext,
  ):  Promise <boolean> {
    const request = context.switchToHttp().getRequest();
    const user1 : User = request.user;
    const user2 : User = request.targetedUser;
    const is_friend = await this.friendService.isFriend(user1,user2)
    if(!is_friend)
      throw new NotFoundException("You're not friends with the target");
    return ( true);
  
  }
}
