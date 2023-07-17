import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { host, server_port, client_address } from './Const';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [
      `http://${client_address}`, 
    ]
    });

    await app.listen(server_port, host, () => {
      console.log(`Server is running on ${host}:${server_port}`);
    });
}

bootstrap();
