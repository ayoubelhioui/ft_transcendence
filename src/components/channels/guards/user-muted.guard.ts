import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import IUsersMutedRepository from '../../repositories/repositories_interfaces/users-muted.repository.interface';
import { Channel, User } from "src/database/entities";

@Injectable()
export class UserMutedGuard implements CanActivate {

    constructor(@Inject('MyUsersMutedRepository') private readonly usersMuted: IUsersMutedRepository) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const channel : Channel = request.channel;
        const user : User = request.user;
        console.log(user);
        console.log(channel);
        const isUserMuted : boolean = await this.usersMuted.isUserMuted(user, channel);
        if (isUserMuted)
            throw new ForbiddenException("the user is Muted in this channel");
        return (true);
    }
}