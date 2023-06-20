import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, Response, Request, Req } from '@nestjs/common'
import { TokenValidationGuard } from 'src/auth/guards/acces-token.guard';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('user')
export class UserController{

    constructor(private userService: UserService) {}
    
    @Get('image/:id')
    async getUserImage(@Param('id', ParseIntPipe) id : number, @Response() res) {
        const stream = fs.createReadStream('./uploads/' + id);  
        stream.pipe(res);
    }

    @Post('image/:id')
    @UseGuards(TokenValidationGuard)
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const newFileName = req.params.id;
                callback(null, newFileName);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
                return (callback(null, false));
            callback(null, true);
        }
    }))
    async updateUserImage(@Param('id', ParseIntPipe) id : number, @Body() body, @UploadedFiles() file, @Response() res, @Request() req) { }

    @UseGuards(TokenValidationGuard)
    @Post('update')
    async updateUser (@Body() body, @Request() req) : Promise<object>{
        return (await this.userService.update(body, req.user));
    }
}

