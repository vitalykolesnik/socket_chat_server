import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UserService } from '@app/modules/user/user.service';
import { CustomSocketInterface } from '@app/types/customSocket.interface';
import { Client } from '@app/decorators/client.decorator';
import { JWTSocketGuard } from '@app/guards/jwtSocket.guard';
import { MessageService } from '@app/modules/message/message.service';
import { CreateMessageDTO } from '@app/modules/message/dto/createMessage.dto';

@UseGuards(JWTSocketGuard)
@WebSocketGateway()
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('messages/create')
  async createMessage(
    @ConnectedSocket() socket: CustomSocketInterface,
    @Client('id') id: string,
    @MessageBody() createMessageDTO: CreateMessageDTO,
  ) {
    const author = await this.userService.findById(id);
    createMessageDTO.from = author;
    const user = await this.userService.findById(createMessageDTO.to.id);
    if (user) {
      await this.messageService.createMessage(createMessageDTO);
      this.notifyAll(socket, await this.getMessages());
    }
  }

  @SubscribeMessage('messages/delete')
  async deleteMessage(
    @ConnectedSocket() socket: CustomSocketInterface,
    @Client('id') clientId: string,
    @MessageBody() id: string,
  ) {
    await this.messageService.deleteMessage(clientId, id);
    this.notifyAll(socket, await this.getMessages());
  }

  @SubscribeMessage('messages/getAll')
  async getAllMessages(@ConnectedSocket() socket: CustomSocketInterface) {
    this.notifyAll(socket, await this.getMessages());
  }

  async getMessages() {
    const { messages } = await this.messageService.findAllMessages();
    return messages;
  }

  notifyAll(@ConnectedSocket() socket: CustomSocketInterface, data: any) {
    socket.emit('messages/update-response', data);
    socket.broadcast.emit('messages/update-response', data);
  }

  notifyClient(@ConnectedSocket() socket: CustomSocketInterface, data: any) {
    socket.emit('messages/update-response', data);
  }
}
