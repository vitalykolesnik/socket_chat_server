if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { dataSource } from '@app/ormconfig';
import { AppModule } from '@app/modules/app/app.module';
import { createDocumentation } from '@app/api/api.utils';
import { SocketAdapter } from '@app/adaters/socket.adapter';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useWebSocketAdapter(new SocketAdapter(app));
  createDocumentation('/', app);

  try {
    await dataSource.initialize();
    await app.listen(port);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
