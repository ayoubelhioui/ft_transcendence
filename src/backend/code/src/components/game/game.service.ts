import { BadRequestException, Inject, Injectable, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { IBlockedUsersRepository, IGamesRepository, IUserRepository } from '../repositories/repositories_interfaces';
import { Game, User } from 'src/database/entities';
import { IsNull, MoreThan, Not } from 'typeorm';
import { FriendsService } from '../friends/friends.service';
import { pl } from 'date-fns/locale';
import { GameGateway } from './game.gateway';
import { GameSessions } from './game-sessions.service';
import { GetUser } from '../user/decorators/user.decorator';
import { customLog } from 'src/Const';
import * as clc from 'cli-color';

@Injectable()
export class GameService {

    
    constructor(
        @Inject("MyUserRepository") private readonly userRepository : IUserRepository,
        @Inject("MyGamesRepository") private readonly gamesRepository : IGamesRepository,
        private readonly friendsService: FriendsService,
        ){}
    
    //user exists guard
    async getUserGamesHistory(user: User) {
        return this.gamesRepository.findByOptions({
            take : 10,
            where: [
                { player1: user, match_time_end: Not(IsNull()) },
                { player2: user, match_time_end: Not(IsNull()) }
            ],
            relations: ["player1","player2"]
            ,
            order: {
                match_time_end: 'DESC',
                },
        });
    }
    
    async getLiveGames(user: User,page: number = 1, pageSize: number = 10) {
        //make it bring only 10 games last started

        const rowsToSkip = (page - 1) * pageSize;
        const liveGames = await this.gamesRepository.findByOptions({
          take: pageSize,
          skip : rowsToSkip, 
          where : {
             player2 : Not(IsNull()),
             match_time_end: IsNull() 
          },
          relations : ["player1","player2"]
        });

        const my_friends = await this.friendsService.getFriends(user)
        const my_friendsIds = my_friends.map((element=>{
            return element.id;
        }))
        const filteredLiveGames = liveGames.filter((element)=>{
            for(let i = 0; i < my_friendsIds.length; i++)
            {
                if(element.player1.id == my_friendsIds[0] || element.player2.id == my_friendsIds[0])
                    return true;
            }
            return false;
        }
        )
        return filteredLiveGames;
    }
    
    // async getMatchResults(@GetUser() user: User) : Promise< Game[] | undefined > {
    //     const matchesResult = await this.gamesRepository.findAllWithRelations({
    //         where : [
    //             { player1id : user.IntraId},
    //             { player2id : user.IntraId} ,
    //         ],
    //         relations : ["player1","player2"]
    //     })
    //     return (matchesResult);
    // }

    async getLatestResult(page: number = 1, pageSize: number = 10) {
        //make it bring only 10 games last started

        const rowsToSkip = (page - 1) * pageSize;
        const liveGames = await this.gamesRepository.findByOptions({
          take: pageSize,
          skip : rowsToSkip, 
          where : {
             player2 : Not(IsNull()),
             match_time_end: Not(IsNull())
          },
          order: { 'match_time_end': 'DESC' },
          relations : ["player1","player2"]
        });
        return liveGames;
    }


    async deleteGame(existingGame: Game)
    {
        customLog(clc.bgRed("Remove Game"))

        if(existingGame)
        await this.gamesRepository.remove(existingGame);
    }

    
    async createGame(player1 : User, player2 : User, gameType : boolean) {
        
      

        if(player2.IntraId ===  2147483647)
        {
            player2 = await this.userRepository.findOneByOptions({
                where : { 
                    IntraId : player2.IntraId
                }
            })
        }

        const existingGame = await this.gamesRepository.findOneByOptions({
            where : {
                player1,
                player2,
                match_time_end: IsNull(),
            },
            relations : ["player2"]
        })

        if (existingGame) {
            return ({
                message : "already have an on going game",
                game : existingGame,
                exists : 1
            })
        } else {
            const game = await this.gamesRepository.create({
                player1,
                player2,
                type : gameType
            });
            return ({
                message : "game created",
                game : game,
                exists : 0
            })
        }
    }

    // async createGame(player1: User,  gameType : boolean){
    //     const existingGame = await this.hasOpenGame(player1)
    //     if(existingGame && existingGame.player2) {
    //         //console.log("Game already exist: ", existingGame.player2.id)
    //         return ({
    //             message : "already have an on going game",
    //             inviteId : existingGame.token,
    //             exists : 1,

    //             game : existingGame
    //         })
    //     }
    //     if(existingGame)
    //         await this.gamesRepository.remove(existingGame);
    //     const game = await this.gamesRepository.create({
    //         player1,
    //         type : gameType
    //     });
    //     //console.log("Game Created DB", game.token)
    //     return ({
    //         message : "game created",
    //         inviteId : game.token,
    //         exists : 0,
    //         game : game
    //     })

    // };

    async hasOpenGame(player1: User)
    {
        const existingGame = await this.gamesRepository.findOneByOptions({
            where : {
                player1,
                match_time_end: IsNull(),
            },
            relations : ["player2"]
        })
        return (existingGame);
    }



    async getJoinedGames(player1: User) : Promise<Game[]>
    {
        const existingGame = await this.gamesRepository.findByOptions({
            where : [{
                player1,
                match_time_end: IsNull(),
            },
            {
                player2 : player1,
                match_time_end: IsNull(),
            }],
            relations : ["player1","player2"]
        })
        return (existingGame);
    }
    // //player2 exists guard
    async joinGame(player2: User,  token : string){

        const game = await this.gamesRepository.findOneByOptions(
            {
                where : {token, match_time_end: IsNull() } ,
                relations: ["player1","player2"]
            }
        )
        if(!game) {
            customLog("game does not exist", token)
            throw new NotFoundException("game finished Or doesn't exist")
        }
        if(game.player2)
            throw new UnauthorizedException("game is full");

        customLog(game.player1.id, player2.id)
        if(game.player1.id === player2.id)
            throw new UnauthorizedException("can't join your own games");

        // const inaccessible = await this.friendsService.blocking_exists(game.player1,player2);
        // if(inaccessible)
        //     throw new UnauthorizedException("user innacessible");
        game.player2 = player2;
        await this.gamesRepository.save(game)
        return game;

    }

    

    //user exists?
    async get_game_link(user: User) : Promise <string | {message : string}>
    {
        const game = await this.gamesRepository.findOneByCondition({
            where : {
                player1: user,
                match_time_end: IsNull(),
            }
        })
        if(!game)
            return ({
                message : "no on going game with that id"
            })
        return game.token;
    }


    //to know which players can input
    async getGamePlayers(token: string) {
        const game = await this.gamesRepository.findOneByCondition({where :{ token }});
        if (game) {
            const { player1, player2, match_time_end } = game;
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
    
    
    async setGameResult(user1Id : number,token: string, player1Score: number, player2Score: number) : Promise <Game> {
        //console.log("gameToken === ", token);
        const gameArr : Game[] = await this.gamesRepository.findByConditionWithRelations({token,player2 : Not(IsNull()), match_time_end : IsNull()},["player1", "player2"]);
        if (gameArr.length) {
            const game : Game = gameArr[0];

            if(game.player1.id == user1Id)
            {} else if(game.player2.id == user1Id)
            {
                [player1Score,player2Score] = [player2Score,player1Score]
            }
            else throw new BadRequestException("user 1 wasn't in playing in this game");

            
            if(game.player1_score && game.player2_score)
                throw new MethodNotAllowedException("already set scores")
            game.player1_score = player1Score;
            game.player2_score = player2Score;
            game.match_time_end = new Date();
            // await this.gamesRepository.save(game);

            
            if(player1Score > player2Score)
           {
                game.player1.wins += 1 
                game.player2.loss += 1 
            } else {
                game.player2.wins += 1 
                game.player1.loss += 1 
            }
            game.player1.winrate = Math.round((game.player1.wins * 100) / (game.player1.wins + game.player1.loss))
            game.player2.winrate = Math.round((game.player2.wins * 100) / (game.player2.wins + game.player2.loss))
            await this.userRepository.save([game.player1 , game.player2])
            return this.gamesRepository.save(game);

            //TODO: on testing phase test if findOneWithRelationsWork
            // chatgpt says I can just save like this when I retrieve with relations
            
        } else {
            // throw new NotFoundException(`Match not found, Or Hasn't started`);
            return (undefined)
        }
    }
  
    async getLeaderboard(page: number = 1, pageSize: number = 10){
        const rowsToSkip = (page - 1) * pageSize;
        const leaderboard = await this.userRepository.findByOptions({
          take: pageSize,
          skip : rowsToSkip, 
          where : [
            {
                wins : MoreThan(0)
            },
                ],
          order: {
          //sort by winrate than sort b games ()
            winrate: 'DESC',
            wins: 'DESC',
          },
        });
        //customLog(leaderboard);
        return leaderboard;
        //highest wr order by games played
    };


    //for guard
    async findGame(token : string)
    {
        return await this.gamesRepository.findOneByCondition({token});
    }
}
