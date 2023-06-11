import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel, ChannelUsers, User } from 'src/database/entities';
import ChannelRepository from '../repositories/channel.repository';
import { UserModule } from '../user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPasswordPipe } from './pipe/validation-password.pipe';
import { PasswordService } from './password.service';
import { ChannelUsersRepository } from '../repositories';
import { ChannelExistsGuard } from './guards/channel-exists.guard';
import { ChannelRolesGuard } from './guards/channel-roles.guard';
import { UserInChannelGuard } from './guards/user-in-channel.guard';
import { UserNotInChannelGuard } from './guards/user-not-in-channel.guard';
import { ChannelUsersService } from './channel-users.service';
import { ValidationPasswordMiddleware } from './middlewares/validation-password.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, User, ChannelUsers]),
    UserModule
  ],
  providers: [
    ChannelService,
    ChannelUsersService,
    PasswordService,
    {
      provide: 'MyChannelRepository',
      useClass: ChannelRepository
    },
    {
      provide: 'MyChannelUsersRepository',
      useClass: ChannelUsersRepository
    },
    ValidationPasswordPipe, 
    /********************** GUARD *************/
    ChannelExistsGuard,
    ChannelRolesGuard,
    UserInChannelGuard,
    UserNotInChannelGuard
  ],
  controllers: [ChannelController]
})
export class ChannelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationPasswordMiddleware)
      .forRoutes(
        { path: 'channels', method: RequestMethod.POST },
        { path: 'channels/:id', method: RequestMethod.PUT },
    );
  }
}