import { User } from "src/database/entities";

export class PlayerJoin{
    isClassic : boolean;
    isBotMode : boolean;
    isWatchMode : boolean;
    userToInvite? : string;
    user : User;
    token? : string;
}

//s : SocketService