import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { PaginationDto } from 'src/global/dto/pagination.dto';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from 'src/database/entities';
import { GameResultDto } from './dto/set-game-result.dto';
import { TypeDto } from 'src/global/dto/boolean.dto';
import { gameTypes, gameTypesNames } from 'src/global/types/game-types';
import { TokenDto } from './dto/token.dto';
import { GameGateway } from './game.gateway';
import { TokenValidationGuard } from '../auth/guards/acces-token.guard';

@Controller('games')
// @UseGuards(TokenValidationGuard)
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

    @Get('/latestResult')
    @UsePipes(ValidationPipe)
    async getLatestResult(@Query() page?: PaginationDto) { 
        if(page && page.page)
            return await this.gameService.getLatestResult(page.page);
        return await this.gameService.getLatestResult();   
    }


    //add dto
    @Put(":token/join")
    async joinGame(@GetUser() user : User,@Param() token :TokenDto) { 
        return await this.gameService.joinGame(user, token.token);
    }

    @Post(':type')
    @UsePipes(ValidationPipe)
    async createGame(@GetUser() user : User, @Param() typeDto : TypeDto){
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
