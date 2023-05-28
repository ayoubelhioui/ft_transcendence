import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService{
    constructor( @InjectRepository(User) private readonly userRepository: Repository<User> ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const newUser = await this.userRepository.create(createUserDto);
        return (await this.userRepository.save(newUser));
    }
    async findUserById(id: number): Promise<User | undefined>{
        return (await this.userRepository.findOne({ 
            where : {
                id: id,
            },
        }));
    }
}

