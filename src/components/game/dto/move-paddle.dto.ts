import { IsNotEmpty, IsNumber } from "class-validator";

export class MovePaddleDto {
    @IsNumber()
    @IsNotEmpty()
    e : number
}