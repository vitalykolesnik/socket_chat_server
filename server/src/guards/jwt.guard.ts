import { UserService } from '@app/modules/user/user.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JWTGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();
    if (request.user) {
      return true;
    }

    throw new UnauthorizedException('Not authorized');
  }
}
