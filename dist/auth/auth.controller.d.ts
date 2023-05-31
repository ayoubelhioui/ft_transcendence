import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(headers: Record<string, string>): void;
    signI(req: string): void;
}
