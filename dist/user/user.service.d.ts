import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from 'src/entities';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: UserDto): Promise<User>;
    findUserById(id: number): Promise<any>;
}
