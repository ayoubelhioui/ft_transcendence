import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common";
import IUsersMutedRepository from '../../repositories/repositories_interfaces/users-muted.repository.interface';
import { Channel, User } from "src/database/entities";
import { Reflector } from "@nestjs/core";

@Injectable()
export class UserMutedGuard implements CanActivate {

    constructor(
        @Inject('MyUsersMutedRepository') private readonly usersMuted: IUsersMutedRepository,
        private reflector: Reflector
        ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isSocket = this.reflector.getAllAndOverride<boolean>('isSocket', [context.getHandler(), context.getClass()]);
        let request;
        if (isSocket)
            request = context.switchToWs().getClient();
        else
            request = context.switchToHttp().getRequest();
        
        const channel : Channel = request.channel;
        const user : User = request.user;
        const isUserMuted : boolean = await this.usersMuted.isUserMuted(user, channel);
        if (isUserMuted)
            throw new ForbiddenException("the user is Muted in this channel");
        return (true);
    }
}