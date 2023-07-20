import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UsePipes, ValidationPipe, UseGuards, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel, ChannelBlacklist, ChannelMessages, ChannelUsers, User } from 'src/database/entities';
import { GetUser } from 'src/components/user/decorators/user.decorator';
import { ChannelRoles } from './decorators/channel-roles.decorator';
import { ChannelUserRole } from '../../global/types/channel-user-roles';
import { ChannelExistsGuard } from './guards/channel-exists.guard';
import { ChannelRolesGuard } from './guards/channel-roles.guard';
import { GetChannel } from 'src/components/channels/decorators/channel.decorator';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ReturnedChannelDto } from './dto/returned-channel.dto';
import { UserNotInChannelGuard } from './guards/user-not-in-channel.guard';
import { GetTargetedChannelUsers } from './decorators/targeted-channel-users.decorator';
import { ChangeMemberRoleDto } from './dto/change-member-role.dto';
import { GetTargetedUser } from './decorators/targeted-user.decorator';
import { MuteMemberDto } from './dto/mute-member.dto';
import { GetChannelUsers } from './decorators/channel-users.decorator';
import { TargetedUserInChannelGuard } from './guards/targeted-user-in-channel.guard';
import { UserInChannelGuard } from './guards/user-in-channel.guard';
import { JoinChannelDto } from './dto/join-channel.dto';
import { PrivateChannelGuard } from './guards/private-channel.guard';
import {  MessagesDateDto } from './dto/messages-date.dto';
import {  UserMutedGuard } from './guards/user-muted.guard';
import { BlacklistedGuard } from './guards/blacklisted.guard';
import { GroupGuard } from './guards/group.guard';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('channels')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}

    @Get('')
    async getChannels(@GetUser() user : User) : Promise < Channel[] | undefined >  {
        return (await this.channelService.getChannels(user));
    };

    // @Get('my')
    // async getMyChannels(@GetUser() user: User) : Promise< Channel[] | undefined > {
    //     return (await this.channelService.getMyChannels(user));
    // };

    @Get(':id/users')
    @UseGuards(ChannelExistsGuard, UserInChannelGuard)
    async getChannelUsers(@Param('id') channelId : number) : Promise< User[] | undefined > {
        return (await this.channelService.getChannelUsers(channelId));
    };
    
    @Post('')
    async createChannel(@GetUser() user: User, @Body() createChannelDto : CreateChannelDto) : Promise < ReturnedChannelDto | undefined > {
        return (await this.channelService.createChannel(user,createChannelDto));
    };



    @Put(':id')
    @ChannelRoles (ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard,UserInChannelGuard, ChannelRolesGuard)
    async updateChannel(@GetChannel() channel: Channel, @Body() updateChannelDto : UpdateChannelDto) : 
    Promise < ReturnedChannelDto | undefined > {
        return (await this.channelService.updateChannel(channel, updateChannelDto));
    };



    @Delete(':id')
    @ChannelRoles(ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard,UserInChannelGuard, ChannelRolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteChannel(@GetChannel() channel: Channel) {
        // console.log(channel);
        await this.channelService.deleteChannel(channel);
    };


    /* check if user is not blocked from this channel*/
    @Post(':id/join')
    @UseGuards(ChannelExistsGuard, GroupGuard,PrivateChannelGuard, UserNotInChannelGuard, BlacklistedGuard)
    async joinChannel(@GetUser() user : User, @GetChannel() channel : Channel, @Body() joinChannelDto : JoinChannelDto) {
        await this.channelService.joinChannel(user, channel, joinChannelDto);
        return {
            message : "user joined successfully"
        };
    };


    @Put(':id/role/:targetUserId')
    @ChannelRoles(ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard, TargetedUserInChannelGuard, ChannelRolesGuard)
    async   changeMemberRole (@GetTargetedUser() targetedUser : User, @GetChannel() channel : Channel,
                            @Body() changeMemberRoleDto: ChangeMemberRoleDto) {
        await this.channelService.changeMemberRole(targetedUser, channel, changeMemberRoleDto);
        return {
            message : "role changed successfully"
        }; 
    };

    @Delete(':id/kick/:targetUserId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard, TargetedUserInChannelGuard,ChannelRolesGuard)
    async kickMember(@GetTargetedUser() targetedUser : User, @GetChannel() channel : Channel){
        return await this.channelService.kickMember(targetedUser, channel);
    };


    @Delete(':id/block/:targetUserId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard,  GroupGuard, UserInChannelGuard, TargetedUserInChannelGuard,ChannelRolesGuard)
    async blockMember(@GetTargetedUser() targetedUser : User, @GetChannel() channel : Channel){
        await  this.channelService.blockMember(targetedUser, channel);
        return {
            message : "user blocked successfully"
        }; 
    };

    @Post(':id/mute/:targetUserId')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard, TargetedUserInChannelGuard,ChannelRolesGuard)
    async muteMember(@GetTargetedUser() targetedMember : User, @GetChannel() channel : Channel, @Body() muteMemberDto : MuteMemberDto){
        await  this.channelService.muteMember(targetedMember, channel, muteMemberDto);
        return {
            message : "user muted successfully"
        }; 
    };

    @Delete(':id/unmute/:targetUserId')
    @ChannelRoles(ChannelUserRole.admin, ChannelUserRole.owner)
    @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard, TargetedUserInChannelGuard,ChannelRolesGuard)
    async unmuteMember(@GetTargetedUser() targetedMember : User, @GetChannel() channel : Channel){
        await  this.channelService.unmuteMember(targetedMember, channel);
        return {
            message : "user unmuted successfully"
        }; 
    };

    // @Delete(':id/leave')
    // @UseGuards(ChannelExistsGuard, GroupGuard, UserInChannelGuard)
    // async leaveChannel(@GetChannel() channel, @GetUser() user  : User, @GetChannelUsers() channelUser : ChannelUsers) {
    //     await  this.channelService.leaveChannel(channel, user, channelUser);
    //     return {
    //         message : "user leave  successfully"
    //     }; 
    // };



    @Get(':id/messages')
    @UseGuards(ChannelExistsGuard, UserInChannelGuard)
    async getChannelMessages(@GetChannel() channel : Channel, @Body() messagesDateDto: MessagesDateDto) : Promise <ChannelMessages[] | undefined>{
        let date : Date = null;
        if (messagesDateDto.date)
            date = new Date(messagesDateDto.date);
        return (await this.channelService.getChannelMessages(channel, date));
    };

    @Post(':id/messages')
    @UseGuards(ChannelExistsGuard, UserInChannelGuard, UserMutedGuard)
    async createMessage(@GetUser() user : User, @GetChannel() channel : Channel, @Body() messageDto : CreateMessageDto) 
                    : Promise <ChannelMessages | undefined> {
        return (await this.channelService.createMessage(user, channel, messageDto.message));
    };
}
