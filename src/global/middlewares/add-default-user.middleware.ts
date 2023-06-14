
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../components/user/user.service';
import { User } from 'src/database/entities';

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    private async createUser() : Promise<User> {
        const user = {id : 10, username : 'test'};
        return this.userService.createUser(user);
      }
    async use(req: Request, res: Response, next: NextFunction) {

        const users : User[] | undefined = await this.userService.findAll();
        const id = 1;
        let user : User = null;
        user = await this.userService.findUserById(id);
        if (!user)
          user = await this.createUser();
        // if (!users || !users.length)
        //    user = await this.createUser();
        // else
        //   user = users[0];
        (req as any).user = user;
        console.log(user);
        next();
    }
}