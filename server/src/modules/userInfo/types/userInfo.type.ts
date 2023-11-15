import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';

export interface UsersInfoResponseInterface {
  infos: UserInfo[];
  count: number;
}
