import { IsNotEmpty } from "class-validator";

export class TokensDto{
    @IsNotEmpty()
    access_token: string;

    @IsNotEmpty()
    refresh_token: string;
}
