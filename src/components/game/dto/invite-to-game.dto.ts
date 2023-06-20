import { IsInt, IsUUID, Length, Min } from 'class-validator';

export class InviteToGameDto {
    @IsUUID()
    @Length(0, 200)
    gameId : string;

    @IsInt()
    @Min(0)
    targetedUserId : number;

}
