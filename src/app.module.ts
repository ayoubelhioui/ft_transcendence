import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfigs from './database/configs/db_configs';
import { UserModule } from './components/user/user.module';

const ENV_PATH : string = './src/.env'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ENV_PATH }),
    TypeOrmModule.forRootAsync(typeOrmConfigs()),
    UserModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
