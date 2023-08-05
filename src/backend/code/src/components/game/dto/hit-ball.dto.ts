import { IsNotEmpty, IsNumber } from "class-validator"

export class HitBallDto {
    @IsNumber()
    @IsNotEmpty()
    distX : number

    @IsNumber()
    @IsNotEmpty()
    distY : number
}