import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import TokenBlacklist from 'src/entities/token_blacklist';
import axios from 'axios';
import { createWriteStream } from 'fs';
const nodemailer = require('nodemailer');

@Injectable()
export class UserService{

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TokenBlacklist) private readonly tokenBlacklistRepository: Repository<TokenBlacklist>) {}

        async createUser(createUserDto: UserDto) : Promise<User>{
        this.initializeUserDto(createUserDto);
        this.uploadImageFromUrl(createUserDto.avatar, './uploads/' + createUserDto.IntraId);
        return (await this.userRepository.save(createUserDto));
    }

    initializeUserDto(createUserDto: UserDto) : void{
        createUserDto.winrate = 0;
        createUserDto.wins = 0;
        createUserDto.loss = 0;
        createUserDto.two_factors_enabled = false;
    }

    async findById(IntraId: number): Promise<User | undefined>{
        const user = await this.userRepository.findOne({
            where : {
                IntraId: IntraId,
            },
        });
        return (user);
    }

    generateImageURL (userId: number, imageExtension: string) : string{
        return ('http://localhost:3000/user/images/' + userId + "." + imageExtension);
    }

    async addTokenToBlacklist(token: string)
    {
        const newEntity = new TokenBlacklist();
        newEntity.Token = token;
        await this.tokenBlacklistRepository.save(newEntity);
    }

    async accessTokenInBlacklist(token: string): Promise<TokenBlacklist | undefined> {
        return (await this.tokenBlacklistRepository.findOne({
            where : {
                Token: token,
            },
        }));
    }

    async update(id: number, userDto: UserDto, imageURL: string) {
        // const resource = await this.findById(id);
        // if (!resource)
        //     throw new NotFoundException('Resource not found.');
        // Object.assign(resource, userDto);
        // return (await this.userRepository.save(resource));
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

    async sendEmail(emailVerificationCode: string, userMail: string){
         const transporter = await nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: 'ayoubelhioui@outlook.com',
              pass: '1234564789ayoubayoub',
            },
          });
          const mailOptions = {
            from: 'ayoubelhioui@outlook.com',
            to: userMail,
            subject: 'Two-Factor Authentication Code',
            text: `Thank you for using Your TRANSCENDENCE. To complete your login and ensure the security of your account, \
please enter the following verification code: \
Verification Code: "${emailVerificationCode}" \
Please enter the code within 3 minutes.\
If you didn't initiate this request or need any assistance, \
please contact our support team\
Best regards,
TRANSCENDENCE TEAM`
          };
          await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error occurred:', error.message);
            } else {
              console.log('Email sent successfully!', info.response);
            }
        });
    }
}