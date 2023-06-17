import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { WebSocketExceptionFilter } from './websocket-exception.filter';
import { ConnectionGateway } from './socket-connection.gateway';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({})
  ],
  providers: [SocketService,WebSocketExceptionFilter, ConnectionGateway],
  exports : [SocketService,WebSocketExceptionFilter]
})
export class SocketModule {}
