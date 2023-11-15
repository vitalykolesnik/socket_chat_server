import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UserService } from '@app/modules/user/user.service';
import { User } from '@app/modules/user/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = verify(token, process.env.JWT_SECRET) as User;
      req.user = await this.userService.findOneBy('id', decoded.id);
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
