
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../components/user/user.service';
import { User } from 'src/database/entities';

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    private async createUser(id) : Promise<User> {
        const user = {id : id, username : 'test'};
        return this.userService.createUser(user);
    }

    async use(req: Request, res: Response, next: NextFunction) {
      console.log('middleware')
        const users : User[] | undefined = await this.userService.findAll();
        const id = 1;
        // console.log(users);
        // let user : User = null;
        // user = await this.userService.findUserById(id);
        if (!users || !users.length)
        {
          console.log('!user')

          var user1 = await this.createUser(id);
          var user2 = await this.createUser(id + 1);
          (req as any).user = user1;
          // (req as any).targetedUser = user2;
        }
        // if (!users || !users.length)
        //    user = await this.createUser();
        // else
        //   user = users[0];
        else
        {
          (req as any).user = users[0];
          // (req as any).targetedUser = users[0];
        }

        // console.log(user);
        next();
    }
}