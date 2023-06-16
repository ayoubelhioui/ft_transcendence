import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway {
  private usersSocket = {
    id : []
  };

  // userSocket.
  @WebSocketServer()
  server: Server;


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    // let myOnlineFriend = [];
    // for (friend of freinds)
    // {

    //   if (friend.id exist in this.usersSocket){
    //     myOnlineFriend.push(friend);
    //   }
    // }
    return 
  }
  // @SubscribeMessage('message')

  handleConnection(socket: Socket) {
    /*
    on user connect :get all channels user belong to
    join all channel sockets he belongs
    */
    console.log('Client connected');
  }


  /*if useer muted, sends a message > dont emit to others, emit a message to that user in that channel "You are muted" on each msg sent

    before sending message fetch if muted,
    if muted, cache expiration date, only fetch again after that
  */
  handleDisconnect(socket: Socket) {
    console.log('Client disconnected');
  }
}
// export class ChatGateway{};
