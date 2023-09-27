import { UserEntity } from '@app/modules/user/entity/user.entity';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: UserEntity;
}
