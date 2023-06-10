import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, User, ChannelUsers]),
    UserModule
  ],
  providers: [
    ChannelService,
    PasswordService,
    {
      provide: 'MyChannelRepository',
      useClass: ChannelRepository
    },
    {
      provide: 'MyChannelUsersRepository',
      useClass: ChannelUsersRepository
    },
    { 
      provide: APP_PIPE, 
      useClass: ValidationPasswordPipe, 
    }
  ],
  controllers: [ChannelController]
})
export class ChannelModule {}