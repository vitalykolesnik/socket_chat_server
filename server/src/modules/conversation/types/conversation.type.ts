import { Conversation } from '@app/modules/conversation/entities/conversation.entity';

export interface ConversationsResponseInterface {
  conversations: Conversation[];
  count: number;
}
