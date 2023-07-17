import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as THREE from 'three';

function isVector3Defined(value: any): boolean {
    console.log(value)
  return value.x !== undefined && value.y !== undefined && value.z !== undefined;
}

export function IsVector3Defined(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isVector3Defined',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return isVector3Defined(value);
        },
      },
    });
  };
}

export class RacketMoveDto
{
    @IsVector3Defined()
    position : THREE.Vector3
}