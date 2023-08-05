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
    acceptLink?: string;

    @IsString()
    @IsOptional()
    acceptMethod?: string;


    @IsString()
    @IsOptional()
    refuseMethod?: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    refuseLink?: string;

    @IsOptional()
    receiverId?: number ;

}