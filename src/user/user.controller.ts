import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { CreateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}
    @Get()
    getUsers(){
        return (this.userService.findUserById())
    }
    @UsePipes(ValidationPipe)
    @Post()
    createUsers(@Body() createUserDto: CreateUserDto){
        console.log(
            createUserDto
        );
        return (this.userService.createUser(createUserDto));
    }
}