import { User } from '@app/modules/user/entities/user.entity';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';
import { CreateMessageDTO } from '@app/modules/message/dto/createMessage.dto';
import { Message } from '@app/modules/message/entities/message.entity';

export interface MessagesResponseInterface {
  messages: Message[];
  count: number;
}

export type MessageCreaterDTO = Omit<CreateMessageDTO, 'to'> & {
  to: User;
  conversation: Conversation;
};
