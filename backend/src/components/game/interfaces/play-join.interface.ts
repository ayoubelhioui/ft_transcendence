import { User } from "src/database/entities";

export class PlayerJoin{
    isClassic : boolean;
    isBotMode : boolean;
    isWatchMode : boolean;
    userToInvite? : number;
    user : User;
    token? : number;
}

//s : SocketService