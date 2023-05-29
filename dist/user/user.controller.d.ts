import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<import("../entities/user.entity").default[]>;
    createUsers(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").default>;
}
