import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';
import TokenBlacklist from 'src/entities/token_blacklist';
import { TokensDto } from 'src/dto/tokens.dto';


@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TokenBlacklist) private readonly tokenBlacklistRepository: Repository<TokenBlacklist>) {}

    async createUser(createUserDto: UserDto){
        this.initializeUserDto(createUserDto);
        const newUser = await this.userRepository.save(createUserDto);
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

    async addingTokensToBlacklist(tokensDto: TokensDto)
    {
        await this.tokenBlacklistRepository.save(tokensDto);
    }

    async refreshTokenInBlacklist(token: string): Promise<boolean>{
        return !!(await this.tokenBlacklistRepository.findOne({
            where : {
                refresh_token: token,
            },
        }));
    }

    async accessTokenInBlacklist(token: string): Promise<boolean>{
        return !!(await this.tokenBlacklistRepository.findOne({
            where : {
                access_token: token,
            },
        }));
    }
}