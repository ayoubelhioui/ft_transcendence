import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty, isNumber, isObject, isString } from "class-validator"
import { UserDto } from "src/global/dto/user.dto"
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export class authTwoFactorVerifyDto {

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  passCode : string;

}