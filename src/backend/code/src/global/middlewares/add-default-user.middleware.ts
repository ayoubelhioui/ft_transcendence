
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../components/user/user.service';
import { User } from 'src/database/entities';
import { customLog } from 'src/Const';




@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    private async createUser(id) : Promise<User | any> {
        const user = {id : id, username : 'test'};
        // return this.userService.createUser(user);
    }

    async use(req: Request, res: Response, next: NextFunction) {
      customLog('middleware')
        const users : User[] | undefined = await this.userService.findAll();
        const id = 2;
        // customLog(users);
        // let user : User = null;
        // user = await this.userService.findUserById(id);
        if (!users || users.length < 2)
        {
          customLog('creating users')

          
          var user1 = await this.createUser(id);
          var user2 = await this.createUser(id + 1);
          var user3 = await this.createUser(id + 2)
          var user4 = await this.createUser(id + 3);
          var user5 = await this.createUser(id + 4);

          (req as any).user = user1;
          // (req as any).targetedUser = user2;
        }
        // if (!users || !users.length)
        //    user = await this.createUser();
        // else
        //   user = users[0];
        else
        {
          (req as any).user = users[1];
          // (req as any).targetedUser = users[0];
        }

        // customLog(user);
        next();
    }
}