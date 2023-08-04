import { IsInt, Min } from "class-validator";

export class MuteMemberDto {
    @IsInt()
    @Min(1)
    muteDurationMinutes : number
}