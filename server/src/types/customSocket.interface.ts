import { Socket } from 'socket.io';
import { UserEntity } from '@app/modules/user/entity/user.entity';

export interface CustomSocketInterface extends Socket {
  user?: UserEntity;
}
