
import { IsString, IsIn } from 'class-validator';
import { gameTypesNames } from '../types/game-types';

export class TypeDto {

      @IsString()
      @IsIn([gameTypesNames[0],gameTypesNames[1]])
      type: string;
}
    