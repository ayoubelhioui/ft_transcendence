import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/components/user/user.service';
import { User } from 'src/database/entities';

@Injectable()
export class AddBotMiddleware implements NestMiddleware {
  static botCreated :boolean = false;
  constructor(private readonly userService: UserService) {}
  private async createBot() : Promise<User> {
      const user = {id : 1, username : 'bot'};
      return this.userService.createUser(user);
  }

  async use(req: any, res: any, next: () => void) {
    if(AddBotMiddleware.botCreated)
      return next();
    const users : User[] | undefined = await this.userService.findAll();
    if(!users || !users.length)
      await this,this.createBot()
    AddBotMiddleware.botCreated = true;
    next();
  }
}
