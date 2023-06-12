import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import TokenBlacklist from 'src/entities/token_blacklist';
import { TokensDto } from 'src/dto/tokens.dto';
const nodemailer = require('nodemailer');

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
        createUserDto.loss = 0;
        createUserDto.two_factors_enabled = false;
    }

    async findUserById(IntraId: number): Promise<User | undefined>{
        const user = await this.userRepository.findOne({
            where : {
                IntraId: IntraId,
            },
        });
        return (user);
    }

    async addTokenToBlacklist(token: string)
    {
        const newEntity = new TokenBlacklist();
        newEntity.Token = token;
        await this.tokenBlacklistRepository.save(newEntity);
    }

    async accessTokenInBlacklist(token: string): Promise<boolean>{
        return !!(await this.tokenBlacklistRepository.findOne({
            where : {
                Token: token,
            },
        }));
    }

    async sendEmail(emailVerificationCode: string, userMail: string){

        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: 'ayoubelhioui@outlook.com',
              pass: '1234564789ayoubayoub',
            },
          });
        
          const mailOptions = {
            from: 'TRANSCENDENCE TEAM',
            to: userMail,
            subject: 'Two-Factor Authentication Code',
            text: ` Thank you for using Your TRANSCENDENCE. To complete your login and ensure the security of your account, \
            please enter the following verification code: \
            Verification Code: ${emailVerificationCode} \
            Please enter the code within 3 minutes.\
            If you didn't initiate this request or need any assistance, \
            please contact our support team\
            Best regards,
            TRANSCENDENCE TEAM`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error occurred:', error.message);
            } else {
              console.log('Email sent successfully!', info.response);
            }
        });
    }
}