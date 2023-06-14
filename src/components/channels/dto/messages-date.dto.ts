import { IsDate, IsOptional, isDateString } from "class-validator";


export class MessagesDateDto {

    @IsDate()
    @IsOptional()
    date ?: Date;
}