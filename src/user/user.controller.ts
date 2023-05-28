import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}
    @Get()
    getUsers(){
        // return (this.userService.)
    }
    @Post()
    createUsers(@Body() createUserDto: CreateUserDto){
        return (this.userService.createUser(createUserDto));
    }
}

