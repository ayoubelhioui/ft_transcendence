import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('channels')
export class ChannelsController {

    @Get('')
    getChannels(){};

    // @Get('users/me/channels')
    // getMyChannels(){};
    
    @Post('')
    createChannel(){};

    @Put(':id')
    updateChannel(){};

    @Delete(':id')
    deleteChannel(){};

    @Post(':id/join')
    addUserToChannel(){};


    @Post(':id/role/:userId')
    changeMemberRole(){};

    @Delete(':id/kick/:userId')
    kickMember(){};


    @Delete(':id/block/:userId')
    blockMember(){};

    @Post(':id/mute/:userId')
    muteMember(){};

    @Delete(':id/leave')
    leaveChannel(){};

    @Get(':id/messages')
    getChannelMessages(){};

    @Post(':id/messages')
    sendMessage(){};
}
