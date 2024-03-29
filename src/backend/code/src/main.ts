import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketAdapter } from './CorsHelp.class';
import { server_host, server_port, client_address, customLog } from './Const';

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

  await app.listen(server_port, server_host, () => {
    customLog(`Server is running on ${server_host}:${server_port}`);
  });

}

bootstrap();
