import { UserEntity } from '@app/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from '@app/modules/message/entity/message.entity';
import { MessagesResponseInterface } from '@app/modules/message/types/message.type';
import { CreateMessageDTO } from '@app/modules/message/dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(
    createMessageDTO: CreateMessageDTO,
  ): Promise<MessageEntity> {
    const message = this.messageRepository.create(createMessageDTO);
    return await this.messageRepository.save(message);
  }

  async findAllMessages(
    limit?: number,
    page?: number,
  ): Promise<MessagesResponseInterface> {
    // const [messages, count] = await this.messageRepository.findAndCount({
    //   relations: { from: true },
    // });
    const customQuery = this.messageRepository.createQueryBuilder('message');
    if (limit) customQuery.take(limit);
    if (page) customQuery.skip(page * limit);
    customQuery.leftJoinAndSelect('message.from', 'userFrom');
    customQuery.leftJoinAndSelect('message.to', 'userTo');
    customQuery.orderBy('message.createdAt');
    const [messages, count] = await customQuery.getManyAndCount();
    return { messages, count };
  }

  async deleteMessage(clientId: string, id: string) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: { from: true },
    });
    if (message.from.id === clientId) {
      await this.messageRepository.delete({ id });
    }
  }
}
