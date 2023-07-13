import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { host, server_port, client_address } from './Const';

async function bootstrap() {
 

  const ipAddresses = ['10.11.11.11', 'localhost'];
  //const ipAddresses = ['localhost'];

  for (const ipAddress of ipAddresses) {
    const app = await NestFactory.create(AppModule);


    app.enableCors({
      origin: [
      `http://${client_address}`,
    ]
    });

    await app.listen(server_port, ipAddress, () => {
      console.log(`Server is running on ${ipAddress}:server_port`);
    });
  }

  
}
bootstrap(); 