import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    IntraId: number;

    @IsNotEmpty()
    username: string;

    // @IsNotEmpty()    
    avatar: string;

    // @IsNotEmpty()    
    wins: number;

    // @IsNotEmpty()    
    loss: number;

    // @IsNotEmpty()    
    winrate: number;
}
