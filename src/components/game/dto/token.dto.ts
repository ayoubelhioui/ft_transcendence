import { IsString, Length } from 'class-validator';

export class TokenDto {
  @IsString()
  @Length(0, 200)
  token: string;
}
