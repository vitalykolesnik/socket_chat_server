import { NextFunction, Response } from 'express';
import { Logger, NestMiddleware } from '@nestjs/common';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: ExpressRequestInterface, res: Response, next: NextFunction): void {
    const { method, originalUrl, body, query } = req;
    // const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      // const contentLength = res.get('content-length');

      const auth = req.headers?.authorization;
      if (auth) {
        // this.logger.log(req.headers.authorization, decode(auth.split(' ')[1]));
      }

      // const message = `${method} ${statusCode} ${userAgent} ${ip}${originalUrl} size: ${contentLength}b`;
      const message = `${method} ${statusCode} ${originalUrl} body: ${JSON.stringify(
        body,
      )}`;

      if (statusCode > 304) this.logger.error(message);
      else {
        this.logger.log(message);
      }
    });
    next();
  }
}
