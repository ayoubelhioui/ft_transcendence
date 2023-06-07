import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    private payload;
    authenticateUser(userDto: UserDto): Promise<object>;
    generateNewToken(expiringTime: string): Promise<string>;
    findUserById(intraId: number): Promise<object>;
    isRefreshTokenValid(refreshToken: string): boolean;
}
