import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from '@app/modules/user/user.controller';
import { UserGateway } from '@app/modules/user/user.gateway';
import { UserEntity } from '@app/modules/user/entity/user.entity';
import { UserService } from '@app/modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserGateway, UserService],
  exports: [UserService],
})
export class UserModule {}
