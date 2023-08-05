import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";


export class numberDto{    
  
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  id: number;
}