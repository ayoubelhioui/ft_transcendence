import { IsNotEmpty, IsString } from "class-validator";

export class stringDto{

  @IsString()
  @IsNotEmpty()
  username: string;
}