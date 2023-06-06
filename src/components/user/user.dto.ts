import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    // @IsNotEmpty()
    // @MinLength(3)
    // password: string;

    // @IsNotEmpty()
    // avatar: string;

    // @IsNotEmpty()
    // wins: number;

    // @IsNotEmpty()
    // loss: number;

    // @IsNotEmpty()
    // winrate: number
}
