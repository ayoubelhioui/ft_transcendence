import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { GameService } from '../game.service';

@Injectable()
export class GameExistsGuard implements CanActivate {
  constructor(
    private readonly gameService : GameService,
  ) {};
  
    async canActivate(
      context: ExecutionContext,
    ):  Promise <boolean> {
      const request = context.switchToHttp().getRequest();
      const token: string = request.params.token.toString();
      const game = await this.gameService.findGame(token);
      if(!game)
        throw new NotFoundException("game doesn't exist");
      request.game = game;
    return true;
  }
}
