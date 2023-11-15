import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';
import { UpdateUserInfoDTO } from '@app/modules/userInfo/dto/updateUserInfo.dto';
import { UsersInfoResponseInterface } from '@app/modules/userInfo/types/userInfo.type';
import { User } from '@app/modules/user/entities/user.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async createInfo(user: User): Promise<UserInfo> {
    const info = this.userInfoRepository.create();
    info.user = user;
    await this.userInfoRepository.save(info);
    return info;
  }

  async getAllInfo(): Promise<UsersInfoResponseInterface> {
    const [infos, count] = await this.userInfoRepository.findAndCount();
    return { infos, count };
  }

  async getInfoByUserId(userId: string): Promise<UserInfo> {
    try {
      const customQuery = this.userInfoRepository.createQueryBuilder('i');
      customQuery.where(`i.userId = :userId`, { userId });
      return await customQuery.getOneOrFail();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateInfo(
    user: User,
    updateInfoDTO: UpdateUserInfoDTO,
  ): Promise<UserInfo> {
    try {
      const info = await this.getInfoByUserId(user.id);
      await this.userInfoRepository.update(info.id, updateInfoDTO);
      return await this.getInfoByUserId(user.id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
