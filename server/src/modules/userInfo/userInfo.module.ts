import { User } from '@app/modules/user/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';
import { UserInfoController } from '@app/modules/userInfo/userInfo.controller';
import { UserInfoService } from '@app/modules/userInfo/userInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [UserInfoService],
})
export class UserInfoModule {}
