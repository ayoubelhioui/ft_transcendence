import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { TokenValidationGuard } from 'src/auth/guards/acces-token.guard';
import { UserService } from './user.service';


@Controller('user')
export class UserController{

    constructor(private userService: UserService) {}
    @Post('update')
    @UseGuards(TokenValidationGuard)
    async userUpdate(@Body() body) {
        return (await this.userService.update(body));
    }
}

