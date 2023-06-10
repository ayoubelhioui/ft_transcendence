import { ChannelsVisibility } from "../types/channel-visibility.type";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, min } from 'class-validator';

export class CreateChannelDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(45)
    @IsOptional()
    password?: string;

    @IsEnum(ChannelsVisibility)
    visibility : ChannelsVisibility = ChannelsVisibility.public;

    @IsOptional()
    isGroup?: boolean = true;

    
}