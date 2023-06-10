import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { UserService } from '../../components/user/user.service';
import { User } from 'src/database/entities';
import { DefaultUser } from '../decorators/default-user.decorator';
import { use } from 'passport';

@Injectable()
export class AddDefaultUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {} // Inject the service in the constructor

  private async createDefaultUser() : Promise<User> {
    const defaultUser = {id : 10, username : 'test'};
    return this.userService.createUser(defaultUser);
  }

  
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const users : User[] | undefined = await this.userService.findAll();
    let defaultUser = null;
    if (!users || !users.length)
      defaultUser = await this.createDefaultUser();
    else
      defaultUser = users[0];
    console.log(defaultUser);
    request.defaultUser = defaultUser;
    return next.handle();
  }
}
