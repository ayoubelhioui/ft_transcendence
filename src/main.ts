import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AddDefaultUserInterceptor } from './global/interceptors/add-default-user.interceptor';
import { UserService } from './components/user/user.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      whitelist : true
  }));
  app.useGlobalInterceptors(new AddDefaultUserInterceptor(app.get(UserService))); // Inject the service
  await app.listen(3000); 
}
bootstrap();
