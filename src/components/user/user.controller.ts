import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { User } from 'src/database/entities';

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get('')
    async getUsers(): Promise < User[] | undefined > {
        const users = await this.userService.findAll();
        return (users);
    }

    @Get(':id')
    async getUser(@Param('id') id: number): Promise< User | undefined> {
        const user = await this.userService.findUserById(id);
        return (user);
    }


    @UsePipes(ValidationPipe)
    @Post()
    async createUsers(@Body() createUserDto: CreateUserDto): Promise< User | undefined>  {
        return (await this.userService.createUser(createUserDto));
    }
}