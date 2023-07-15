import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { User } from "src/database/entities";

//!check if isWatchMod = true => token is exist
//!check if userToInvite = true => token is undefined w 3akss (optional)

export class PlayerJoinDto{
    @IsBoolean()
    @IsNotEmpty()
    isClassic : boolean;

    @IsNotEmpty()
    @IsBoolean()
    isBotMode : boolean;

    @IsBoolean()
    @IsNotEmpty()
    isWatchMode : boolean;

    @IsUUID()
    @IsOptional()
    userToInvite : string;

    @IsNotEmpty()
    user : User;
   
    @IsUUID()
    @IsOptional()
    token? : string;
}

//s : SocketService