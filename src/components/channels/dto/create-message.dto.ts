import { IsDate, IsOptional, IsString, isDateString } from "class-validator";


export class CreateMessageDto {

    @IsString()
    message : string
}