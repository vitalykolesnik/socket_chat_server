import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JWTGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    console.log('AuthGuard: ', request.user);
    if (request.user) {
      return true;
    }

    throw new UnauthorizedException('Not authorized');
  }
}
