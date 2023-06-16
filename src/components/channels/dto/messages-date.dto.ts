import { IsDate, IsDateString, IsOptional, isDateString } from "class-validator";


export class MessagesDateDto {

    @IsDateString()
    @IsOptional()
    date ?: string;
}