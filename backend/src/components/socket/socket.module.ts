import { Module, forwardRef } from '@nestjs/common';
import { SocketService } from './socket.service';
import { WebSocketExceptionFilter } from './websocket-exception.filter';
import { ConnectionGateway } from './socket-connection.gateway';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ChannelModule } from '../channels/channel.module';
import { FriendsModule } from '../friends/friends.module';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => ChannelModule),
    forwardRef(() => FriendsModule),
    forwardRef(() => GameModule)
  ],
  providers: [SocketService,WebSocketExceptionFilter, ConnectionGateway],
  exports : [SocketService, WebSocketExceptionFilter, ConnectionGateway,]
})
export class SocketModule {}
