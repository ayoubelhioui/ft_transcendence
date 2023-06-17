import { Injectable, NotFoundException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/database/entities';

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
  
    removeSocket(userId: number, socket : Socket) {
        if (this.socketMap.has(userId)) {
            const socketArray = this.socketMap.get(userId);
            socketArray.filter(element => element != socket);
        }
    }

    getUser(socket : any) : User
    {
        return socket.user;
    }
}
