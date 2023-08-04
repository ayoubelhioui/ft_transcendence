import {IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    username: string;
}
