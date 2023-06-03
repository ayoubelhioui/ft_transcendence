import { AuthService } from "./auth.service";
import { UserDto } from "src/user/user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(req: any): void;
    singI(userDto: UserDto): Promise<object>;
}
