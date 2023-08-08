import { Injectable, NestMiddleware } from '@nestjs/common';
import { AchievementService } from 'src/components/achievement/achievement.service';
import { UserService } from 'src/components/user/user.service';
import { Achievement, User } from 'src/database/entities';

@Injectable()
export class AddBotMiddleware implements NestMiddleware {
  static botCreated :boolean = false;
  constructor(
    private readonly userService: UserService,
    private readonly achievementsService: AchievementService
    // private readonly achievementRepository: AchievementRepository
    ) {}
  private async createBot() : Promise<User> {
      const user = {id : 1, username : 'bot', IntraId: 2147483647,avatar: "botavatar", wins : 0, loss : 0, winrate : 0, two_factors_enabled: false};
      return this.userService.createUser(user);
  }

  async use(req: any, res: any, next: () => void) {
    if(AddBotMiddleware.botCreated)
      return next();
    const BOT = await this.userService.findUserByIntraId(2147483647);

    if(!BOT)
    {
      await this.createBot()
      await this.achievementsService.setInitialAchievements([
        {
          id : 1,
          name : "bot_loss",
          icon : "bot_loss.png",
          users : []
        },
        {
          id : 2,
          name : "bot_win",
          icon : "bot_win.png",
          users : []
        },
        {
          id : 3,
          name : "first_game",
          icon : "first_game.png",
          users : []
        },
        {
          id : 4,
          name : "win_with_0",
          icon : "win_with_0.png",
          users : []
        },
      ])
    }
    AddBotMiddleware.botCreated = true;
    next();
  }
}
