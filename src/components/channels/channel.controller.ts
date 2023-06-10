import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel, User } from 'src/database/entities';
import { DefaultUser } from 'src/global/decorators/default-user.decorator';
import { ValidationPasswordPipe } from './pipe/validation-password.pipe';
import { use } from 'passport';
import { STATUS_CODES } from 'http';

@Controller('channels')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}

    @Get('')
    async getChannels() : Promise < Channel[] | undefined >  {
        return (await this.channelService.getChannels());
    };

    @Get('my')
    async getMyChannels(@DefaultUser() user: User) : Promise< Channel[] | undefined > {
        return (await this.channelService.getMyChannels(user));
    };
    
    @Post('')
    @UsePipes(ValidationPasswordPipe)
    async createChannel(@Body() createChannelDto : CreateChannelDto, @DefaultUser() user: User) : Promise < CreateChannelDto | undefined > {
        return (await this.channelService.createChannel(user,createChannelDto));
    };



    @Put(':id')
    async updateChannel(){};



    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChannel(@Param('id', ParseIntPipe)  channelId : number, @DefaultUser() user: User) {
        await this.channelService.deleteChannel(channelId, user.id);
    };

    @Post(':id/join')
    async joinChannel(){};


    @Post(':id/role/:userId')
    async changeMemberRole(){};

    @Delete(':id/kick/:userId')
    async kickMember(){};


    @Delete(':id/block/:userId')
    async blockMember(){};

    @Post(':id/mute/:userId')
    async muteMember(){};

    @Delete(':id/leave')
    async leaveChannel(){};

    @Get(':id/messages')
    async getChannelMessages(){};

    @Post(':id/messages')
    async sendMessage(){};
}
