import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, Response, Request } from '@nestjs/common'
import { TokenValidationGuard } from 'src/auth/guards/acces-token.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
@Controller('user')
export class UserController{

    constructor(private userService: UserService) {}

    @Post(':id')
    @UseGuards(TokenValidationGuard)
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
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
                return (callback(null, false));
            callback(null, true);
        }
    }))
    async userUpdate(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file, @Response() res, @Request() req) {
    }

    @Post('update')
    @UseGuards(TokenValidationGuard)
    update(@Request() req, @Body() body) {
        // console.log(body.username);
    }

    async getUserImage(@Param('id', ParseIntPipe) id : number, @Response() res) {
        res.setHeader('Content-Type', 'image/jpeg');
        const stream = fs.createReadStream('./uploads/' + id);
        stream.pipe(res);
    }

    
}

