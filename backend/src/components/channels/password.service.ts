import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    async hashPassword(password : string) : Promise <string> {
        if (!password || !password.length)
            return (password);
        const saltOrRounds = 10; // Number of salt rounds for hashing
        const hashedPassword : string = await bcrypt.hash(password, saltOrRounds);
        return hashedPassword;
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        if (!password  || !hashedPassword)
            return (false);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}