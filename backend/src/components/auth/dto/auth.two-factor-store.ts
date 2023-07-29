import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber, isObject, isString } from "class-validator"
import { UserDto } from "src/global/dto/user.dto"
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export class authTwoFactorVerifyStorDto {

  @IsNotEmpty()
  @IsString()
  passCode : string;

  @IsNotEmpty()
  @IsString()
  secretCode : string;

}