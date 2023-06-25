import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { SocketService } from "src/components/socket/socket.service";
import { User } from "src/database/entities";

export class PlayerJoinDto{
    @IsBoolean()
    @IsNotEmpty()
    isClassic : boolean;

    @IsNotEmpty()
    @IsBoolean()
    isBotMode : boolean;

    @IsNotEmpty()
    user : User;
   
    @IsUUID()
    @IsOptional()
    token? : string;
}

s : SocketService