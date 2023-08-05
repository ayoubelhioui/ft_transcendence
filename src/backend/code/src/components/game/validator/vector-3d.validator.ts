import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

function isVector3Defined(value: any): boolean {
  return value.x !== undefined && 
          value.y !== undefined && 
          value.z !== undefined &&
          typeof value.x === 'number' && 
          typeof value.y === 'number' && 
          typeof value.z === 'number';
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