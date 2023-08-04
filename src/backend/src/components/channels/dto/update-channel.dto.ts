import { ChannelsVisibility } from "../../../global/types/channel-visibility.type";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, min } from 'class-validator';

export class UpdateChannelDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(45)
    @IsOptional()
    password?: string;

    @IsEnum(ChannelsVisibility)
    @IsOptional()
    visibility : ChannelsVisibility = ChannelsVisibility.public;

}
