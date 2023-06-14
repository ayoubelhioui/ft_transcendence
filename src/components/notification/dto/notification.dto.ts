import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class NotificationDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(150)
    message: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    link?: string;


    @IsOptional()
    receiverId?: number ;

}