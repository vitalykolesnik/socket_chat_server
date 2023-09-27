import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { UserService } from '@app/modules/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('AuthMiddleware: ', token);
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      const candidate = JSON.parse(JSON.stringify(decoded));
      req.user = await this.userService.findById(candidate.id);
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
