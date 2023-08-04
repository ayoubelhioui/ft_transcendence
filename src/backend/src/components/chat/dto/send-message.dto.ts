import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from 'class-transformer';


export class sendMessageDto{
    @IsString()
    @IsNotEmpty()
    message : string;

    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    channelId : number;
}