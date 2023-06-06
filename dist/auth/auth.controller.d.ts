import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singIn(req: any): void;
    singUp(req: any): Promise<object>;
}
