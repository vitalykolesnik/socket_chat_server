import { IoAdapter } from '@nestjs/platform-socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { loggerSocketMiddleware } from '@app/middleware/loggerSocket.middleware';
import { authSocketMiddleware } from '@app/middleware/authSocket.middleware';

@Injectable()
export class SocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: process.env.SOCKET_CORS,
    });
    server.use(authSocketMiddleware());
    const logger = new Logger('SOCKET');
    server.use(loggerSocketMiddleware(logger));
    return server;
  }
}
