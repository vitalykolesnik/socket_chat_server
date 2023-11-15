import { CommentsResponseInterface } from './types/comment.type';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '@app/modules/comment/dto/createComment.dto';
import { UpdateCommentDto } from '@app/modules/comment/dto/updateComment.dto';
import { Comment } from '@app/modules/comment/entities/comment.entity';
import { Message } from '@app/modules/message/entities/message.entity';
import { User } from '@app/modules/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(
    user: User,
    message: Message,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create();
    comment.author = user;
    comment.message = message;
    comment.text = createCommentDto.text;
    return await this.commentRepository.save(comment);
  }

  async findAll(): Promise<CommentsResponseInterface> {
    const [comments, count] = await this.commentRepository.findAndCount({
      relations: { author: true },
    });
    return { comments, count };
  }

  async update(
    user: User,
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const comment = await this.findOne(id);
      if (comment.author.id !== user.id)
        throw new UnauthorizedException('Only creator can edit comment');
      await this.commentRepository.update(id, updateCommentDto);
      return await this.findOne(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOne(id: string): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: { id },
      relations: { author: true, message: true },
    });
  }

  async remove(user: User, id: string) {
    try {
      const comment = await this.findOne(id);
      if (comment.author.id !== user.id)
        throw new UnauthorizedException('Only creator can delete own comment');
      await this.commentRepository.delete(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
