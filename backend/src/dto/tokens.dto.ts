import { IsNotEmpty } from "class-validator";

export class TokensDto{
    @IsNotEmpty()
    Token: string;

    // @IsNotEmpty()
    // refresh_token: string;
}
