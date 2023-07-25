import { CreateUserDto } from "./dto/user.dto";
import { Channel, ChannelUsers, Game, User } from 'src/database/entities';
import { ChannelService } from '../channels/channel.service';
import { GetUser } from './decorators/user.decorator';
import { ChannelExistsGuard, GroupGuard,PrivateChannelGuard, UserNotInChannelGuard, BlacklistedGuard, UserInChannelGuard} from '../channels/guards';
import { GetChannel, GetChannelUsers } from '../channels/decorators';
import { JoinChannelDto } from '../channels/dto';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, Response, Request, Req, Delete, NotFoundException } from '@nestjs/common'
import { TokenValidationGuard } from 'src/components/auth/guards/acces-token.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { UserDto } from 'src/global/dto/user.dto';
import { TargetUserExistGuard } from "./guards/target-user-exists.guard";
import { GameService } from "../game/game.service";
import { GetTargetedUser } from "./decorators/targeted-user.decorator";
import { TargetUserSpecialCaseGuard } from "./guards/target-user-special-case-guard";


@Controller('users')
// @UseGuards(TokenValidationGuard)
export class UserController{

    constructor(
        private readonly userService: UserService,
        private readonly gameService: GameService,
        private readonly channelService : ChannelService
        ) {}


    @Get('')
    async getUsers(): Promise < User[] | undefined > {
        const users = await this.userService.findAll();
        return (users);
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise< User | undefined> {
        const user = await this.userService.findUserById(id);
        return (user);
    }

    @UseGuards(TargetUserSpecialCaseGuard)
    @Get(':targetUserId/matchhistory')
    async getMatchHistory( @GetTargetedUser() targettedUser : User ): Promise< Game[] | undefined> {
        const games : Game[] = await this.gameService.getUserGamesHistory(targettedUser);
        return (games);
    }


    @Get(':targetUserId/achievements')
    @UseGuards(TargetUserSpecialCaseGuard)
    async getAchievements(@GetTargetedUser() user) {
        return (this.userService.findUserById(user.id, ["achievements"]));
    }
    
    // @UserGuards(TargetUserSpecialCaseGuard)
    // @Get('')
    // async createUsers(@Body() createUserDto: UserDto): Promise< User | undefined>  {
    //     return (await this.userService.createUser(createUserDto));
    // }

    @Get('me/channels')
    async getMyChannels(@GetUser() user: User) : Promise< Channel[] | undefined > {
        console.log('over here');
        return (await this.channelService.getUserChannels(user));
    };


    @Delete('me/channels/:id/leave')
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard)
    async leaveChannel(@GetChannel() channel, @GetUser() user  : User, @GetChannelUsers() channelUser : ChannelUsers) {
        await  this.channelService.leaveChannel(channel, user, channelUser);
        return {
            message : "user leave  successfully"
        }; 
    };


    
    @Get('image/:id')
    async getUserImage(@Param('id', ParseIntPipe) id : number, @Response() res) {
        const stream = fs.createReadStream('./uploads/' + id);
        stream.on('error', (err) => {
            console.log("Error")
            stream.destroy();
            res.status(404).json({ error: 'Image not found' });
        });
        // stream.on('end', () => {
            
        // });
        stream.pipe(res);
        
    }

    @Post('image/:id')
    // @UseGuards(TokenValidationGuard)
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const newFileName = req.params.id;
                callback(null, newFileName);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
                return (callback(null, false));
            callback(null, true);
        }
    }))
    async updateUserImage(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file, @Response() res, @Request() req) { }

    // @UseGuards(TokenValidationGuard)
    @Post('update')
    async updateUser (@Body() body, @Request() req) : Promise<object>{
        const User = await this.userService.update(body, req.user);
        return (User);
    }
}