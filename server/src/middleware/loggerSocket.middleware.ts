import { Logger } from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomSocketInterface } from '@app/types/customSocket.interface';

export const loggerSocketMiddleware = (logger: Logger) => {
  const socketLogger = logger;
  return (socket: CustomSocketInterface, next: NextFunction) => {
    {
      socket.on('connection', () => {
        socketLogger.debug(`Connect ${socket.user} by [${socket.id}]`);
      });

      socket.on('disconnecting', () => {
        socketLogger.debug(`Disconnect ${socket.user} by [${socket.id}]`);
      });

      socket.onAny((event, data) => {
        socketLogger.debug(
          `From: [${socket.id}] event: [${event}]
          data: ${JSON.stringify(data)}`,
        );
      });
      next();
    }
  };
};
