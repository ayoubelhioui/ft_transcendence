import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { PaginationDto } from 'src/global/dto/pagination.dto';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from 'src/database/entities';
import { GameResultDto } from './dto/set-game-result.dto';
import { BooleanDto } from 'src/global/dto/boolean.dto';
import { gameTypes, gameTypesNames } from 'src/global/types/game-types';
import { TokenDto } from './dto/token.dto';
import { GameGateway } from './game.gateway';

@Controller('games')
export class GameController {

    constructor(private readonly gameService: GameService,
) {}
    
    // @Get('users/:id/gameHistory')


    //make page dto?
    @Get('/leaderboard')
    async getLeaderboard(){
       return await this.gameService.getLeaderboard();
    };

    
    @Get('/live')
    @UsePipes(ValidationPipe)
    async getLiveGames(@Query() page?: PaginationDto) { 
        if(page && page.page)
            return await this.gameService.getLiveGames(page.page);
        return await this.gameService.getLiveGames();
        
    }

    //add dto
    @Put(":token/join")
    async joinGame(@GetUser() user : User,@Param() token :TokenDto) { 
        return await this.gameService.joinGame(user, token.token);
    }

    @Post(':type')
    @UsePipes(ValidationPipe)
    async createGame(@GetUser() user : User, @Param() typeDto : BooleanDto){
        let type;
        if(typeDto.type === gameTypesNames[0])
            type = 0;
        else 
            type = 1

        return await this.gameService.createGame(user,type)
    };


    @Put(':token/surrender')
    @UsePipes(ValidationPipe)
    async setSurrender(@GetUser() user : User, @Param() token : TokenDto){
        return await this.gameService.setGameResult(user.id, token.token ,0,5);
    };

    @Put('')
    @UsePipes(ValidationPipe)
    //gameExists guard
    async setGameResult(@Body() results:GameResultDto){
        return await this.gameService.setGameResult(results.user1Id,results.token,results.player1Score,results.player2Score);
    }


    // getGamePlayers(){};

   
}
