import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import User from 'src/entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(id: number): Promise<User>;
    createUsers(createUserDto: CreateUserDto): Promise<User>;
}
