import { IsInt, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  @Max(999)
  @IsOptional()
  page: number;
}
