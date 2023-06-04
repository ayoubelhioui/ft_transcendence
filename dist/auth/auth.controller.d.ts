import { AuthService } from "./auth.service";
import { Response } from 'express';
import { UserDto } from "src/user/user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singI(userDto: UserDto, res: Response): Promise<object>;
}
