
// import { IsNotEmpty } from "class-validator";

import { IsNotEmpty, IsOptional } from "class-validator";

// 
export class UserDto{
    
    @IsNotEmpty()
    IntraId?: number;

    
    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    email?: string;

    
    @IsNotEmpty()
    avatar?: string;

    
    @IsNotEmpty()
    wins?: number;

    @IsOptional()
    isFirstTime? : boolean = true;

    
    @IsNotEmpty()  
    loss?: number;

    
    @IsNotEmpty()
    winrate?: number;

    
    @IsNotEmpty()
    two_factors_enabled?: boolean;

    @IsNotEmpty()
    twoFactorSecret?: string;
}
