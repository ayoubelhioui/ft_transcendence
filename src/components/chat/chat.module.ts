import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports : [
    UserModule,
    JwtModule.register({})
  ],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {

}
