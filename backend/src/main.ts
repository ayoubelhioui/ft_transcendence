import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketAdapter } from './CorsHelp.class';
import { host, server_port, client_address } from './Const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true});
  app.useWebSocketAdapter(new SocketAdapter(app));
  app.useGlobalPipes(new ValidationPipe({
      whitelist : true,
      transform : true
  }));

  // app.enableCors({
  //   origin: [
  //   `http://${client_address}`, 
  // ]
  // });

  await app.listen(server_port, host, () => {
    console.log(`Server is running on ${host}:${server_port}`);
  });; 
}

bootstrap();
