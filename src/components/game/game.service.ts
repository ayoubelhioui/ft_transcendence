import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
    getUserGamesHistory(){};
    
    getLiveGames(){};
    createGame(){};
    getGamePlayers(){};
    //update gamePlayers win rate
    setGameResult(){};
    getLeaderboard(){};
}
