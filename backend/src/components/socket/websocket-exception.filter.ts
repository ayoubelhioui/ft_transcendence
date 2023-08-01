import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(HttpException)
export class WebSocketExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    
    const status = exception.getStatus();
    const message = exception.message;
    console.log("Filtering: ", message)
    // Send the WebSocket exception to the client
    client.emit('exception', {status, message});
  }
}
