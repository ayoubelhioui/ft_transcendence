import {IsOptional, IsString} from "class-validator";

export class JoinChannelDto {
    @IsString()
    @IsOptional()
    password?: string;
}