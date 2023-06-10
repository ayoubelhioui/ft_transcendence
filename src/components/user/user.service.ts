import { Inject, Injectable } from '@nestjs/common';
import {CreateUserDto} from './user.dto';
import { User } from 'src/database/entities';
import { IUserRepository } from 'src/components/repositories/repositories_interfaces';
import UserRepository from '../repositories/user.repository';
import ABaseRepository from 'src/components/repositories/repositories_interfaces/base/base.repository.abstract';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(@Inject('MyUserRepository') private readonly userRepository: IUserRepository) {}

    async createUser(createUserDto: CreateUserDto): Promise<User | undefined>{

        return  (this.userRepository.create(createUserDto));
    }
    
    async findUserById(id: number, relations: any = {}): Promise<User | undefined> {
        return  (this.userRepository.findOneByIdWithRelations(id, relations));
    }

    async findAll()
    {
        return  (this.userRepository.findAll());
    }

    async removeUser(userId : number)
    {
        return (this.userRepository.remove(userId));
    }
}
