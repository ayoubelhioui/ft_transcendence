import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketAdapter } from './CorsHelp.class';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true});
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.useGlobalPipes(new ValidationPipe({
      whitelist : true,
      transform : true
  }));
  await app.listen(3001,"192.168.1.6"); 
}
bootstrap();
