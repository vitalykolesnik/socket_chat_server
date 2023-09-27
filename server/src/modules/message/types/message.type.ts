import { MessageEntity } from '@app/modules/message/entity/message.entity';

export interface MessagesResponseInterface {
  messages: MessageEntity[];
  count: number;
}
