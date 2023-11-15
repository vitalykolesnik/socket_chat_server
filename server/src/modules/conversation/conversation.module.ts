import { User } from '@app/modules/user/entities/user.entity';
import { Message } from '@app/modules/message/entities/message.entity';
import { UserModule } from '@app/modules/user/user.module';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';
import { Module } from '@nestjs/common';
import { ConversationService } from '@app/modules/conversation/conversation.service';
import { ConversationController } from '@app/modules/conversation/conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message]), UserModule],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
