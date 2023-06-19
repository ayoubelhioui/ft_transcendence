import { Injectable, NotFoundException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Channel, User } from 'src/database/entities';
import { Length } from 'class-validator';

@Injectable()
export class SocketService {

    private socketMap: Map< number, Socket[] > = new Map< number, Socket[] >();

    addSocket(userId: number, socket: Socket) {
        if (this.socketMap.has(userId)) {
            const socketArray = this.socketMap.get(userId);
            socketArray.push(socket);
         } else {
            this.socketMap.set(userId, [socket]);
        }
    }
  
    getSocket(userId: number): Socket[] | undefined {
        const sockets : Socket[] = this.socketMap.get(userId);
        if(!sockets || !sockets.length )
            throw new NotFoundException("user not online");
        return sockets;
    }


    isUserOnline(userId: number): Socket[] {
        const sockets : Socket[] = this.socketMap.get(userId);
        if(!sockets || !sockets.length )
            return [];
        return sockets;
    }

  
    removeSocket(userId: number, socket : Socket) {
        if (this.socketMap.has(userId)) {

            const socketArray = this.socketMap.get(userId);
            const indexToRemove = socketArray.indexOf(socket);
            if (indexToRemove !== -1) {
                socketArray.splice(indexToRemove, 1);
            }
        }
    }

    getUser(socket : any) : User
    {
        return socket.user;
    }


    getChannel(socket : any) : Channel
    {
        return socket.channel;
    }
}
