import { MessageController } from './message.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@app/modules/user/user.service';
import { MessageService } from '@app/modules/message/message.service';
import { MessageGateway } from '@app/modules/message/message.gateway';
import { UserEntity } from '@app/modules/user/entity/user.entity';
import { MessageEntity } from '@app/modules/message/entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MessageEntity])],
  providers: [MessageGateway, UserService, MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
