import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    logOut(): void;
    newAccessToken(req: any): Promise<object>;
    singIn(req: any): {
        statusCode: number;
    };
    singUp(req: any): Promise<object>;
}
