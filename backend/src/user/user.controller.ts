import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { TokenValidationGuard } from 'src/auth/guards/acces-token.guard';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController{

    constructor(private userService: UserService) {}

    @Patch(':id')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const extension = file.originalname.split('.')[1];
                const newFileName = ':id.' + extension;
                callback(null, newFileName);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
                return (callback(null, false));
            callback(null, true);
        }
    }))
    // @UseGuards(TokenValidationGuard)
    async userUpdate(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file) {
        console.log(file);
        // return (await this.userService.update(id, body));
    }
}

