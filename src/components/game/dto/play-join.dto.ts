import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { User } from "src/database/entities";

export class PlayerJoinDto{
    @IsBoolean()
    @IsNotEmpty()
    isClassic : boolean;

    @IsNotEmpty()
    @IsBoolean()
    isBotMode : boolean;

    @IsBoolean()
    @IsNotEmpty()
    isWatchMod : boolean;

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