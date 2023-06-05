import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: UserDto): Promise<void>;
    findUserById(id: number): Promise<User>;
}
