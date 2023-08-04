import { ChannelsVisibility } from "../../../global/types/channel-visibility.type";
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, isInt, min } from 'class-validator';

export class CreateChannelDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @IsInt()
    @IsOptional()
    targetUserId?: number;

    @IsBoolean()
    @IsOptional()
    isGroup : boolean = true;
    

    @IsString()
    @MinLength(5)
    @MaxLength(45)
    @IsOptional()
    password?: string;

    @IsEnum(ChannelsVisibility)
    visibility : ChannelsVisibility = ChannelsVisibility.public;
}