import { UserEntity } from '@app/modules/user/entity/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;

export interface UserResponseInterface {
  user: UserType & { token: string };
}

export type UsersType = UserType[];

export interface UsersResponseInterface {
  users: UsersType;
  count: number;
}
