import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/user/user.dto";
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    createUser(userDto: UserDto): Promise<object>;
}
