import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '@app/modules/message/entities/message.entity';
import {
  MessageCreaterDTO,
  MessagesResponseInterface,
} from '@app/modules/message/types/message.type';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(createMessage: MessageCreaterDTO): Promise<Message> {
    const message = this.messageRepository.create(createMessage);
    return await this.messageRepository.save(message);
  }

  async findAllMessages(
    limit?: number,
    page?: number,
  ): Promise<MessagesResponseInterface> {
    const customQuery = this.messageRepository.createQueryBuilder('m');
    customQuery.leftJoinAndSelect('m.from', 'f');
    customQuery.leftJoinAndSelect('m.to', 't');
    customQuery.leftJoinAndSelect('m.comments', 'c');
    // customQuery.leftJoinAndSelect('message.conversation', 'conv');
    if (limit) customQuery.take(limit);
    if (page) customQuery.skip(page * limit);
    customQuery.orderBy('message.createdAt');
    const [messages, count] = await customQuery.getManyAndCount();
    return { messages, count };
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { from: true, to: true, comments: true },
    });
    return message;
  }

  async deleteMessage(userId: string, id: string) {
    try {
      const message = await this.findOne(id);
      if (!message)
        throw new BadRequestException(`Not found message with id: ${id}`);
      if (message.from.id !== userId)
        throw new UnauthorizedException('Only creator can delete the message');
      await this.messageRepository.delete({ id });
      return { id };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
