import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';


@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async createUser(createUserDto: UserDto){
        this.initializeUserDto(createUserDto);
        const newUser = await this.userRepository.create(createUserDto);
    }

    initializeUserDto(createUserDto: UserDto) : void{
        createUserDto.avatar = 'this is just a test';
        
        createUserDto.winrate = 0;
        createUserDto.wins = 0;
    }

    async findUserById(IntraId: number): Promise<User>{
        const user = await this.userRepository.findOne({
            where : {
                IntraId: IntraId,
            },
        });
        return (user);
    }
}