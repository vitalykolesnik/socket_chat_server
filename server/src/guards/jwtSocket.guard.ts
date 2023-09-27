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
    const user = await this.userService.findById(client.user.id);
    if (!user) throw new UnauthorizedException('User not authorised!');
    return true;
  }
}
