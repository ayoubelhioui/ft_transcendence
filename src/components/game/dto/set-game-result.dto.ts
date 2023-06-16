import { IsInt, Min, Max, IsString } from 'class-validator';

export class GameResultDto {
  @IsString()
  token: string;

  @IsInt()
  @Min(0)
  user1Id : number;

  @IsInt()
  @Min(0)
  @Max(10)
  player1Score: number;

  @IsInt()
  @Min(0)
  @Max(10)
  player2Score: number;
}
