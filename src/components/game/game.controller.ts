import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('games')
export class GameController {

    
    // @Get('users/:id/gameHistory')


    @Get('/live')
    getLiveGames(){};


    @Post('')
    createGame(){};


    @Put('')
    setGameResult(){};


    // getGamePlayers(){};

    @Get('/leaderboard')
    getLeaderboard(){};

}
