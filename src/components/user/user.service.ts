import { Inject, Injectable } from '@nestjs/common';
import {CreateUserDto} from './user.dto';
import { User } from 'src/database/entities';
import { IUserRepository } from 'src/repositories_interfaces';
import UserRepository from './user.repository';
import ABaseRepository from 'src/repositories_interfaces/base/base.repository.abstract';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(@Inject('MyUserRepository') private readonly userRepository: IUserRepository) {}

    async createUser(createUserDto: CreateUserDto): Promise<User | undefined>{

        return  (this.userRepository.create(createUserDto));
    }
    
    async findUserById(id: number): Promise<User | undefined> {

        console.log(typeof this.userRepository);
        console.log(this.userRepository instanceof UserRepository);
        console.log(this.userRepository instanceof ABaseRepository);
        console.log(this.userRepository instanceof Repository);
        return  (this.userRepository.findOneById(id));
    }

    async findAll()
    {
        return  (this.userRepository.findAll());
    }
}
