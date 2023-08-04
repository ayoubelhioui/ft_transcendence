import { Module, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { SocketModule } from '../socket/socket.module';
import { ChannelModule } from '../channels/channel.module';
import { ChannelUsersRepository, UsersMutedRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel, ChannelUsers, Friends, User, UsersMuted } from 'src/database/entities';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Channel, User, ChannelUsers, UsersMuted, Friends]),
    UserModule,
    JwtModule.register({}),
    forwardRef(() => SocketModule),
    ChannelModule,
    FriendsModule
  ],
  providers: [
    ChatService, 
    ChatGateway,
    {
      provide: 'MyChannelUsersRepository',
      useClass: ChannelUsersRepository
    },
    {
      provide: 'MyUsersMutedRepository',
      useClass: UsersMutedRepository
    },
  ]
})
export class ChatModule {

}
