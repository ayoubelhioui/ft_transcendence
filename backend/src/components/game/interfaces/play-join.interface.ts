import { User } from "src/database/entities";

export interface PlayerJoin{
    isClassic : boolean;
    isBotMode : boolean;
    isWatchMode : boolean;
    userToInvite? : number;
    user : User;
    invite_callback : any;
    token? : string;
}

//s : SocketService