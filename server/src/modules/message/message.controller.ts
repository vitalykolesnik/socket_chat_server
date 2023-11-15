import { ConversationService } from '@app/modules/conversation/conversation.service';
import { CreateMessageDTO } from '@app/modules/message/dto/createMessage.dto';
import { UserService } from '@app/modules/user/user.service';
import {
  MessageCreaterDTO,
  MessagesResponseInterface,
} from '@app/modules/message/types/message.type';
import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MessageService } from '@app/modules/message/message.service';
import { CurrentClient } from '@app/decorators/client.decorator';
import { MessageBody } from '@nestjs/websockets';
import { JWTGuard } from '@app/guards/jwt.guard';

@ApiTags('message')
@Controller()
export class MessageController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  @Get('messages')
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  async getMessages(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<MessagesResponseInterface> {
    return await this.messageService.findAllMessages(limit, page - 1);
  }

  @Post('/message/:convId')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async createMessage(
    @Param('convId') convId: string,
    @CurrentClient('id') id: string,
    @MessageBody() createMessageDTO: CreateMessageDTO,
  ) {
    const author = await this.userService.findOneBy('id', id);
    let to = null;
    if (createMessageDTO.to)
      to = await this.userService.findOneBy('id', createMessageDTO.to);
    const conversation = await this.conversationService.findOneBy('id', convId);
    if (!conversation) throw new BadRequestException('Not found conversation');
    await Promise.all([conversation, to, author]);
    const newMessage: MessageCreaterDTO = {
      ...createMessageDTO,
      from: author,
      to,
      conversation,
    };
    return await this.messageService.createMessage(newMessage);
  }

  @Delete('/message/:messageId')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async deleteMessage(
    @CurrentClient('id') id: string,
    @Param('messageId') messageId: string,
  ) {
    const author = await this.userService.findOneBy('id', id);
    return await this.messageService.deleteMessage(author.id, messageId);
  }
}
