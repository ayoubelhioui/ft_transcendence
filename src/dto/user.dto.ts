import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    id: number;

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
