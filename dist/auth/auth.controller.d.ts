import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    logOut(body: any): Promise<void>;
    newAccessToken(req: any): Promise<object>;
    singIn(req: any): {};
    singUp(req: any): Promise<object>;
}
