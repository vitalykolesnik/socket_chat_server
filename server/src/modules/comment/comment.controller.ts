import { User } from './../user/entities/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '@app/modules/user/user.service';
import { MessageService } from '@app/modules/message/message.service';
import { CommentService } from '@app/modules/comment/comment.service';
import { CreateCommentDto } from '@app/modules/comment/dto/createComment.dto';
import { UpdateCommentDto } from '@app/modules/comment/dto/updateComment.dto';
import { Comment } from '@app/modules/comment/entities/comment.entity';
import { CurrentUser } from '@app/decorators/user.decorator';
import { JWTGuard } from '@app/guards/jwt.guard';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async create(
    @CurrentUser() user: User,
    @Param('messageId') messageId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const message = await this.messageService.findOne(messageId);
    return this.commentService.create(user, message, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Put(':id')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async update(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.update(user, id, updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.commentService.remove(user, id);
  }
}
