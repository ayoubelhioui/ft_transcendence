import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBlockedUsersRepository, IGamesRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { User } from 'src/database/entities';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class GameService {


    
    constructor(
        @Inject("UserRepository") private readonly userRepository : IUserRepository,
        @Inject("BlockedUsersRepository") private readonly blockedUsersRepository : IBlockedUsersRepository,
        @Inject("GamesRepository") private readonly gamesRepository : IGamesRepository,

        ){}
    
    //user exists guard
    async getUserGamesHistory(user: User) {
        this.gamesRepository.findByCondition({
            where: [
                { player1: user, match_time_end: Not(IsNull()) },
                { player2: user, match_time_end: Not(IsNull()) }
            ]
        });
    }
    
    async getLiveGames() {
        //make it bring only 10 games last started
        const liveGames = await this.gamesRepository.findByCondition({ match_time_end: IsNull() });
        return liveGames;
    }
    
    async createGame(){
        //if blocked users they cant play with each other
    };

    async getGamePlayers(token: string) {
        const matchHistory = await this.gamesRepository.findOneById({ token });
        if (matchHistory) {
            const { player1, player2, match_time_end } = matchHistory;
            const isLive = match_time_end === null;
            return {
                player1,
                player2,
                isLive
            };
        } else {
            throw new NotFoundException('Match not found');
        }
    }
    
    
    async setGameResult(token: string, player1Score: number, player2Score: number) {
        const matchHistory = await this.gamesRepository.findOneByIdWithRelations(token,["player1", "player2"]);
        if (matchHistory) {
            matchHistory.player1_score = player1Score;
            matchHistory.player2_score = player2Score;
            matchHistory.match_time_end = new Date();
            await this.gamesRepository.save(matchHistory);

            if(player1Score > player2Score)
            {
                matchHistory.player1.wins += 1 
                matchHistory.player2.loss += 1 
            } else {
                matchHistory.player1.wins += 1 
                matchHistory.player2.loss += 1 
            }
            matchHistory.player1.winrate = (matchHistory.player1.wins * 100) / (matchHistory.player1.wins + matchHistory.player1.loss)
            matchHistory.player2.winrate = (matchHistory.player2.wins * 100) / (matchHistory.player2.wins + matchHistory.player2.loss)
            this.gamesRepository.save(matchHistory);

            //TODO: on testing phase test if findOneWithRelationsWork
            // chatgpt says I can just save like this when I retrieve with relations
            return matchHistory;
        } else {
            throw new NotFoundException('Match not found');
        }
    }
  
    async getLeaderboard(){
        //highest wr order by games played
    };

    //update the winrate



}
