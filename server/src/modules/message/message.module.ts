import { User } from '@app/modules/user/entities/user.entity';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';
import { ConversationModule } from '@app/modules/conversation/conversation.module';
import { MessageController } from '@app/modules/message/message.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from '@app/modules/message/message.service';
import { MessageGateway } from '@app/modules/message/message.gateway';
import { Message } from '@app/modules/message/entities/message.entity';
import { UserModule } from '@app/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User]),
    UserModule,
    ConversationModule,
  ],
  providers: [MessageGateway, MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
