import { Socket } from "socket.io"
import { User } from "src/database/entities";

export interface Player{
    id : number
    socket : Socket
    user : User;
}