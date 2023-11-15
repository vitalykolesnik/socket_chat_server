import { ConversationService } from '@app/modules/conversation/conversation.service';
import { UseGuards } from '@nestjs/common';
import {
  // ConnectedSocket,
  // MessageBody,
  // SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserService } from '@app/modules/user/user.service';
// import { CustomSocketInterface } from '@app/types/customSocket.interface';
// import { CurrentClient } from '@app/decorators/client.decorator';
import { JWTSocketGuard } from '@app/guards/jwtSocket.guard';
import { MessageService } from '@app/modules/message/message.service';
// import { CreateMessageDTO } from '@app/modules/message/dto/createMessage.dto';
// import { MessageCreaterDTO } from '@app/modules/message/types/message.type';

@UseGuards(JWTSocketGuard)
@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  // @SubscribeMessage('messages/create')
  // async createMessage(
  //   @ConnectedSocket() socket: CustomSocketInterface,
  //   @CurrentClient('id') id: string,
  //   @MessageBody() createMessageDTO: CreateMessageDTO,
  // ) {
  // const author = await this.userService.findBy('id', id);
  // const to = await this.userService.findBy('id', createMessageDTO.to);
  // const conversation = await this.conversationService.findBy('id', createMessageDTO.conv.Id);
  // await Promise.all([conversation, to, author]);
  // const newMessage: MessageCreaterType = {
  //   ...createMessageDTO,
  //   to,
  //   conversation,
  // };
  // createMessageDTO.from = author;
  // createMessageDTO.to = user
  // if (user) {
  //   await this.messageService.createMessage(createMessageDTO);
  //   this.notifyAll(socket, await this.getMessages());
  // }
  // }

  // @SubscribeMessage('messages/delete')
  // async deleteMessage(
  //   @ConnectedSocket() socket: CustomSocketInterface,
  //   @MessageBody() id: string,
  // ) {
  //   await this.messageService.deleteMessage(socket.id, id);
  //   this.notifyAll(socket, await this.getMessages());
  // }

  // @SubscribeMessage('messages/getAll')
  // async getAllMessages(@ConnectedSocket() socket: CustomSocketInterface) {
  //   this.notifyAll(socket, await this.getMessages());
  // }

  // async getMessages() {
  //   const { messages } = await this.messageService.findAllMessages();
  //   return messages;
  // }

  // notifyAll(@ConnectedSocket() socket: CustomSocketInterface, data: any) {
  //   socket.emit('messages/update-response', data);
  //   socket.broadcast.emit('messages/update-response', data);
  // }

  // notifyClient(@ConnectedSocket() socket: CustomSocketInterface, data: any) {
  //   socket.emit('messages/update-response', data);
  // }
}
