import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    authenticateUser(userDto: UserDto): Promise<object>;
    findUserById(userId: number): Promise<object>;
}
