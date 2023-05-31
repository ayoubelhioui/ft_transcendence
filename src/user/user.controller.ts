// import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
// import { CreateUserDto } from "./user.dto";
// import { UserService } from "./user.service";
// import User from 'src/entities/user.entity';

// @Controller('users')
// export class UserController{
//     constructor(private readonly userService: UserService) {}
//     @Get(':id')
//     getUsers(@Param(':id') id: number): Promise<User> {
//         return (this.userService.findUserById(id));
//     }
//     @UsePipes(ValidationPipe)
//     @Post()
//     createUsers(@Body() createUserDto: CreateUserDto): Promise<User> {
//         return (this.userService.createUser(createUserDto));
//     }
// }