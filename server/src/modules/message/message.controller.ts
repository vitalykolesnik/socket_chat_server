import { MessagesResponseInterface } from '@app/modules/message/types/message.type';
import { JWTGuard } from '@app/guards/jwt.guard';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Optional,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MessageService } from '@app/modules/message/message.service';

@ApiTags('message')
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('messages')
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  async getMessages(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<MessagesResponseInterface> {
    return await this.messageService.findAllMessages(limit, page - 1);
  }
}