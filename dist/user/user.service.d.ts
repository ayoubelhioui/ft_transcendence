import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import User from 'src/entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findUserById(id: number): Promise<any>;
}
