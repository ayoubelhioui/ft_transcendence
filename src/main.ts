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
  const address = process.env.SERVER_HOST || 'localhost'
  const port = +process.env.SERVER_PORT || 3001
  console.log("Server started on: ", address, ":", port)
  await app.listen(port, address); 
}
bootstrap();
