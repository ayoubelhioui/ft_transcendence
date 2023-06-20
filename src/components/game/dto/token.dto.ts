import { IsString, IsUUID, Length } from 'class-validator';

export class TokenDto {
  @IsUUID()
  @Length(0, 200)
  token: string;
}
