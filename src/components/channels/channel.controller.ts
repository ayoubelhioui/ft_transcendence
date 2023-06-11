import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel, User } from 'src/database/entities';
import { GetUser } from 'src/global/decorators/default-user.decorator';
import { ChannelRoles } from './decorators/channel-roles.decorator';
import { ChannelUserRole } from './types/channel-user-roles';
import { ChannelExistsGuard } from './guards/channel-exists.guard';
import { UserInChannelGuard } from './guards/user-in-channel.guard';
import { ChannelRolesGuard } from './guards/channel-roles.guard';
import { GetChannel } from 'src/global/decorators/channel.decorator';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ReturnedChannelDto } from './dto/returned-channel.dto';
import { UserNotInChannelGuard } from './guards/user-not-in-channel.guard';

@Controller('channels')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}

    @Get('')
    async getChannels() : Promise < Channel[] | undefined >  {
        return (await this.channelService.getChannels());
    };

    @Get('my')
    async getMyChannels(@GetUser() user: User) : Promise< Channel[] | undefined > {
        return (await this.channelService.getMyChannels(user));
    };
    
    @Post('')
    async createChannel(@GetUser() user: User, @Body() createChannelDto : CreateChannelDto) : Promise < ReturnedChannelDto | undefined > {
        return (await this.channelService.createChannel(user,createChannelDto));
    };



    @Put(':id')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, UserInChannelGuard, ChannelRolesGuard)
    async updateChannel(@GetChannel() channel: Channel, @Body() updateChannelDto : UpdateChannelDto) : 
    Promise < ReturnedChannelDto | undefined > {
        return (await this.channelService.updateChannel(channel, updateChannelDto));
    };



    @Delete(':id')
    @ChannelRoles(ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, UserInChannelGuard, ChannelRolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChannel(@GetChannel() channel: Channel) {
        // console.log(channel);
        await this.channelService.deleteChannel(channel);
    };


    /* check if user is not blocked from this channel*/
    @Post(':id/join')
    @UseGuards(ChannelExistsGuard, UserNotInChannelGuard)
    async joinChannel(@GetUser() user : User, @GetChannel() channel : Channel) {

    };


    @Post(':id/role/:userId')
    @ChannelRoles(ChannelUserRole.owner)
    async changeMemberRole(){};

    @Delete(':id/kick/:userId')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    async kickMember(){};


    @Delete(':id/block/:userId')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    async blockMember(){};

    @Post(':id/mute/:userId')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    async muteMember(){};

    @Delete(':id/leave')
    async leaveChannel(){};

    @Get(':id/messages')
    async getChannelMessages(){};

    @Post(':id/messages')
    async sendMessage(){};
}
