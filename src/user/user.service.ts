import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';


@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    async createUser(createUserDto: UserDto){
        createUserDto.avatar = 'helloWorld';
        createUserDto.loss = 39;
        createUserDto.winrate = 33;
        createUserDto.wins = 3333;
        const newUser = await this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
    }
    async findUserById(id: number): Promise<User>{
        const user = await this.userRepository.findOne({ 
            where : {
                id: id,
            },
        });
        // if (!user)
        //     throw new NotFoundException('User not found');
        return (user);
    }
}