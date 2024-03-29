import { CreateUserDto } from "./dto/user.dto";
import { Channel, ChannelUsers, Game, User } from 'src/database/entities';
import { ChannelService } from '../channels/channel.service';
import { GetUser } from './decorators/user.decorator';
import { ChannelExistsGuard, GroupGuard,PrivateChannelGuard, UserNotInChannelGuard, BlacklistedGuard, UserInChannelGuard} from '../channels/guards';
import { GetChannel, GetChannelUsers } from '../channels/decorators';
import { JoinChannelDto } from '../channels/dto';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, Response, Request, Req, Delete, Put, UnauthorizedException } from '@nestjs/common'
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
import { numberDto } from "./dto/numberDto.dto";
import { stringDto } from "./dto/stringDto.dto";
import { FriendsService } from "../friends/friends.service";
import { customLog } from "src/Const";


@Controller('users')
// @UseGuards(TokenValidationGuard)
export class UserController{

    constructor(
        private readonly userService: UserService,
        private readonly gameService: GameService,
        private readonly channelService : ChannelService,
        private readonly friendsService : FriendsService
    
        
        ) {}


    @Get('')
    async getUsers(): Promise < User[] | undefined > {
        const users = await this.userService.findAll();
        return (users);
    }


    @Get(':id')
    async getUser(@GetUser() loggedUser : User , @Param() idDto: numberDto): Promise< User | undefined> {
        const {id} = idDto;
        const user = await this.userService.findUserById(id);
        const block_status = await this.friendsService.is_blocked_by(loggedUser, user);
        if(block_status)
            throw new UnauthorizedException("You cannot view this user");
        return (user);
    }

    @Get('search/:username')
    async getUsersByName(@Param() usernameDto : stringDto)
    {
        const {username} = usernameDto;
        const users = await this.userService.findByUsername(username);
        return users;
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
        const userWithAchievements = await this.userService.findUserById(user.id, ["achievements"])
        return (userWithAchievements.achievements);
    }
    
    // @UserGuards(TargetUserSpecialCaseGuard)
    // @Get('')
    // async createUsers(@Body() createUserDto: UserDto): Promise< User | undefined>  {
    //     return (await this.userService.createUser(createUserDto));
    // }

    @Get('me/channels')
    async getMyChannels(@GetUser() user: User) : Promise< Channel[] | undefined > {
        return (await this.channelService.getUserChannels(user));
    };

    @Get('me/channels/:id/role')
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard)
    async getUserRole(@Request() req) : Promise< any > {
        return ({
            role : (req as any).userRole,
        })
    };

    @Get('me/channels/:id/status')
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard)
    async getStatusInChannel(@GetUser() user: User, @GetChannel() channel) : Promise< Object | undefined > {
        return (await this.channelService.getUserStatusInChannel(user, channel));
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
    async getUserImage(@Param('id') id : string, @Response() res) {
        //console.log(id);
        const stream = fs.createReadStream('./uploads/' + id);
        stream.on('error', (err) => {
            customLog("Error")
            stream.destroy();
            res.status(404).json({ error: 'Image not found' });
        });
        // stream.on('end', () => {
            
        // });
        stream.pipe(res);
        
    }

    @Put('image/:id')
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
    async updateUserImage(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file, @Response() res, @Request() req){
        res.status(200).json({ message: 'picture uploaded successfully' });
    }

    @Post('userInfo/:id')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                //console.log("Saved ... ")
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
    async updateUserImages(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file, @Response() res, @Request() req){
        const User = await this.userService.update(req.user.id, body);
        res.status(200).json({ message: 'picture uploaded successfully' });
    }

    @Put('update')
    async updateUser (@Request() req, @Body() body) : Promise<object> {
        const User = await this.userService.update(req.user.id, body);
        return (User);
    }
}