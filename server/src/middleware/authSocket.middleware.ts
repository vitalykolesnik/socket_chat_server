import { User } from '@app/modules/user/entities/user.entity';
import { CustomSocketInterface } from '@app/types/customSocket.interface';
import { UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const authSocketMiddleware = () => {
  return (socket: CustomSocketInterface, next: NextFunction) => {
    const token = socket.handshake?.auth?.token;
    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        socket.user = decoded as User;
        next();
      } catch (error) {
        next(new UnauthorizedException('Not valid token'));
      }
    } else {
      next(new UnauthorizedException('Auth error'));
    }
  };
};
