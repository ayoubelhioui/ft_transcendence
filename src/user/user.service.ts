import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from 'src/entities';

@Injectable()
export class UserService{
    constructor( @InjectRepository(User) private readonly userRepository: Repository<User> ) {}

    async createUser(createUserDto: UserDto): Promise<User>{
        const newUser = await this.userRepository.create(createUserDto);
        // return (await this.userRepository.save(newUser));
    }
    
    async findUserById(id: number): Promise<any>{
        return (await this.userRepository.findOne({ 
            where : {
                id: id,
            },
        }));
    }
}
