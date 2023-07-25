import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
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

    @IsNumber()
    @IsOptional()
    userToInvite : number;

    @IsNotEmpty()
    @IsOptional()
    user : User;
   
    @IsUUID()
    @IsOptional()
    token? : string;

    @IsNotEmpty()
    @IsOptional()
    invite_callback : any

}

//s : SocketService