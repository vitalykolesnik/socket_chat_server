import { User } from '@app/modules/user/entities/user.entity';

export type UserType = Omit<User, 'hashPassword'>;

export interface UserResponseInterface {
  user: UserType & { token: string };
}

export type UsersType = UserType[];

export interface UsersResponseInterface {
  users: UsersType;
  count: number;
}
