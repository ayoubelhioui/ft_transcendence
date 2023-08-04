import { SocketService } from "src/components/socket/socket.service";
import { User } from "src/database/entities";

export interface PlayerJoin{
    isClassic : boolean;
    isBotMode : boolean;
    isWatchMode : boolean;
    userToInvite? : number;
    user : User;
    socketService : SocketService;
    token? : string;
}

//s : SocketService