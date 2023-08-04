import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserRepository } from 'src/components/repositories/repositories_interfaces';
import { User } from 'src/database/entities';


//SETS TARGET USER
@Injectable()
export class TargetUserExistGuard implements CanActivate {
  constructor(@Inject('UserRepository') private readonly userRepository: IUserRepository,
) {};

  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const targetUserId : number = parseInt(request.params.targetUserId);
    if (isNaN(targetUserId))
            throw new BadRequestException("the Targeted UserId Must be a Number");
    const user = await this.userRepository.findOneById(targetUserId);
    if(!user)
      throw new NotFoundException("Targeted user doesn't exist");
    if(user.id === request.user.id)
      throw new BadRequestException("you cant target yourself with this action");
    request.targetedUser = user;
    return true;
  }
}
