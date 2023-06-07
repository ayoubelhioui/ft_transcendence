import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelsService {


    createChannel(){};
    // get list public / protected groups
    getChannels(){};

    // get 30 message  of a channel  before this date if given
    //note : date should be in a microsecond
    getChannelMessages(idUser : number, date? : Date){};


    getMyChannels(){};

    addUserToChannel(){};


    deleteChannel(){};


    updateChannel(){};


    changeMemberRole(){};


    kickMember(){};

    blockMember(){};


    muteMember(){};

    //if it owner set owner to the first user in channel
    //if the channel is empty just delete it
    leaveChannel(){};

    //if not muted
    sendMessage(channeliD: number, message : any){};

}
