import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { SocketService } from "src/components/socket/socket.service";
import { User } from "src/database/entities";


export class PlayerJoinDto{
    @IsBoolean()
    @IsNotEmpty()
    isClassic : boolean;

    @IsNotEmpty()
    @IsBoolean()
    isBotMode : boolean;

    @IsNumber()
    @IsOptional()
    userToInvite : number;

    @IsNotEmpty()
    @IsOptional()
    user : User;
   

    @IsOptional()
    token? : string;

    @IsNotEmpty()
    @IsOptional()
    socketService : SocketService

}

//s : SocketService