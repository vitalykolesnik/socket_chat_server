import { UserEntity } from '@app/modules/user/entity/user.entity';
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
        socket.user = decoded as UserEntity;
        next();
      } catch (error) {
        next(new UnauthorizedException('Not valid token'));
      }
      // verify(
      //   socket.handshake.auth.token as string,
      //   process.env.JWT_SECRET,
      //   (err, decoded) => {
      //     if (err) {
      //       next(new UnauthorizedException('Not valid token'));
      //     } else {
      //       socket.user = decoded as UserEntity;
      //       next();
      //     }
      //   },
      // );
    } else {
      next(new UnauthorizedException('Auth error'));
    }
  };
};
