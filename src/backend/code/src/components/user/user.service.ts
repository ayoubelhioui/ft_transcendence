import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel, User } from 'src/database/entities';
import { Like, Repository } from 'typeorm';
import { UserDto } from 'src/global/dto/user.dto';
import TokenBlacklist from 'src/database/entities/token_blacklist';
import axios from 'axios';
import { createWriteStream } from 'fs';
import { customLog } from 'src/Const';
import { IUserRepository } from '../repositories/repositories_interfaces';
import { AchievementService } from '../achievement/achievement.service';
import SimpleCrypto from 'simple-crypto-js';
const nodemailer = require('nodemailer');

@Injectable()
export class UserService{

    constructor(@Inject('MyUserRepository') private readonly userRepository: IUserRepository,
        @InjectRepository(TokenBlacklist) private readonly tokenBlacklistRepository: Repository<TokenBlacklist>,
        private readonly achievementService : AchievementService) {}

    async createUser(createUserDto: UserDto) : Promise<User>{
        this.initializeUserDto(createUserDto);
        return (await this.userRepository.save(createUserDto));
    }

    initializeUserDto(createUserDto: UserDto) : void{
        createUserDto.winrate = 0;
        createUserDto.wins = 0;
        createUserDto.loss = 0;
        createUserDto.two_factors_enabled = false;
        // createUserDto.twoFactorSecret = "";
    }

    async getSecretById(id: number) {
        return (await this.userRepository.getSecretById(id));
    }

    async findUserById(id: number, relations: any = {}): Promise<User | undefined> {
        const user : User  = await this.userRepository.findOneByIdWithRelations(id, relations);
        if (!user)
            throw new NotFoundException("user Not Found");
        return (user);
    }

    //!findById

    async findUserByIntraId(intraId: number): Promise<User | undefined>{
        const user = await this.userRepository.findOneByOptions({
            where : {
                IntraId: intraId,
            },
        });
        return (user);
    }

    async findUserByEmail(email: string): Promise<User | undefined>{
        const user = await this.userRepository.findOneByOptions({
            where : {
                email: email,
            },
        });
        return (user);
    }

    private async _findByUsernameMatched(username: string): Promise<User | undefined>{
        const user = await this.userRepository.findOneByOptions({
            where : {
                username: username,
            },
        });
        return (user);
    }

    async setAchievement(id : number, userId : number)
    {
        const userWithAchievements = await this.findUserById(userId, ["achievements"])
        const achivementsIds = userWithAchievements.achievements.map((achievment) => achievment.id)
        if(!achivementsIds.includes(id))
        {
            const achievement = await this.achievementService.getAchievement(id);
            userWithAchievements.achievements.push(achievement);
            await this.userRepository.save(userWithAchievements);
        }
    }
    
    async findByUsername(username_: string): Promise<User[]>{
        const users = await this.userRepository.findByOptions({
            where : {
                username : Like(`${username_}%`)
            },
        });
        return (users);
    }

    async findAll()
    {
        return  (this.userRepository.findAll());
    }

    async removeUser(userId : number)
    {
        return (await this.userRepository.delete(userId));
    }
    async disableTwoFactors(id: number) {
        const user = await this.findUserById(id)
        user.twoFactorSecret = null;
        user.two_factors_enabled = false;
        return (await this.userRepository.save(user));
    }
    async storeUserSecret(id :number, secret: string) {
        const simpleCrypto = new SimpleCrypto('helloWorldTesting'); //this 'helloWorldTesting' should be in the .env
        const encryptedData = simpleCrypto.encrypt(secret);
        const user = await this.findUserById(id)
        user.twoFactorSecret = encryptedData
        user.two_factors_enabled = true
        return (await this.userRepository.save(user));
    }
    // generateImageURL (userId: number, imageExtension: string) : string{
    //     return (`http://${server_address}/user/images/` + userId + "." + imageExtension);
    // }

    async addTokenToBlacklist(token: string)
    {
        const newEntity = new TokenBlacklist();
        newEntity.Token = token;
        await this.tokenBlacklistRepository.save(newEntity);
    }

    // async getAchievements(id: number) : any {
    //     return (this.userRepository.findAllWithRelations({
    //         where: {
    //             IntraId
    //         }
    //     }))
    // }
    async accessTokenInBlacklist(token: string): Promise<TokenBlacklist | undefined> {
        return (await this.tokenBlacklistRepository.findOne({
            where : {
                Token: token,
            },
        }));
    }

    async update(id: number, userDto: UserDto) {
        userDto.isFirstTime = false;
        const user = await this._findByUsernameMatched(userDto.username);
        if (!user)
            return await this.userRepository.update(id, userDto);
        throw new BadRequestException('username already exist');
    }


    async uploadImageFromUrl(url: string, destinationPath: string): Promise<void> {
        const response = await axios.get(url, { responseType: 'stream' });
    
        const writer = createWriteStream(destinationPath);
        response.data.pipe(writer);
    
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
    }

    
}
