import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';

@Injectable()
export class JWTSocketGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    if (!client.user) throw new UnauthorizedException('User not authorised!');
    client.user = await this.userService.findOneBy('id', client.user.id);
    return true;
  }
}
