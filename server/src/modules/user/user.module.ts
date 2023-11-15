import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoModule } from '@app/modules/userInfo/userInfo.module';
import { UserController } from '@app/modules/user/user.controller';
import { UserGateway } from '@app/modules/user/user.gateway';
import { User } from '@app/modules/user/entities/user.entity';
import { UserService } from '@app/modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserInfoModule],
  controllers: [UserController],
  providers: [UserGateway, UserService],
  exports: [UserService],
})
export class UserModule {}
