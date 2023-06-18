import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, UseGuards, Delete } from '@nestjs/common';
import { CreateUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { Channel, ChannelUsers, User } from 'src/database/entities';
import { ChannelService } from '../channels/channel.service';
import { GetUser } from './decorators/user.decorator';
import { ChannelExistsGuard, GroupGuard,PrivateChannelGuard, UserNotInChannelGuard, BlacklistedGuard, UserInChannelGuard} from '../channels/guards';
import { GetChannel, GetChannelUsers } from '../channels/decorators';
import { JoinChannelDto } from '../channels/dto';

@Controller('users')
export class UserController{
    constructor(
        private readonly userService: UserService,
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


    @UsePipes(ValidationPipe)
    @Post()
    async createUsers(@Body() createUserDto: CreateUserDto): Promise< User | undefined>  {
        return (await this.userService.createUser(createUserDto));
    }

    @Get('me/channels')
    async getMyChannels(@GetUser() user: User) : Promise< Channel[] | undefined > {
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
}