import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@app/modules/user/entities/user.entity';
import { UpdateConversationDTO } from '@app/modules/conversation/dto/updateConversation.dto';
import { ConversationsResponseInterface } from '@app/modules/conversation/types/conversation.type';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';
import { CreateConversationDTO } from '@app/modules/conversation/dto/createConversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(
    user: User,
    createConversationDTO: CreateConversationDTO,
  ): Promise<Conversation> {
    const newConversation = this.conversationRepository.create();
    newConversation.creator = user;
    newConversation.admins = [user];
    newConversation.members = [user];
    if (createConversationDTO.title)
      newConversation.title = createConversationDTO.title;
    return await this.conversationRepository.save(newConversation);
  }

  async findAll(
    user: User,
    q?: string,
  ): Promise<ConversationsResponseInterface> {
    const membersQuery = this.conversationRepository.createQueryBuilder('c');
    membersQuery.leftJoinAndSelect('c.members', 'm');
    membersQuery.leftJoinAndSelect('c.admins', 'a');
    membersQuery.leftJoinAndSelect('c.creator', 'cr');
    membersQuery.where('m.id = :userId', { userId: user.id });
    membersQuery.distinct();
    if (q) {
      membersQuery.andWhere(`c.title LIKE '%${q}%'`);
    }
    const [conversations, count] = await membersQuery.getManyAndCount();
    return { conversations, count };
  }

  async findOne(user: User, id: string): Promise<Conversation> {
    try {
      const customQuery = this.conversationRepository.createQueryBuilder('c');
      customQuery.where({ id });
      customQuery.leftJoinAndSelect('c.messages', 'm');
      customQuery.leftJoinAndSelect('m.from', 'f');
      customQuery.leftJoinAndSelect('f.info', 'f_i');
      customQuery.leftJoinAndSelect('m.to', 't');
      customQuery.leftJoinAndSelect('c.members', 'me');
      customQuery.leftJoinAndSelect('me.info', 'm_i');
      customQuery.leftJoinAndSelect('c.admins', 'admins');
      customQuery.leftJoinAndSelect('c.creator', 'creator');
      const conversation = await customQuery.getOneOrFail();
      const isAutorized = conversation.members.some((u) => u.id === user.id);
      if (!isAutorized) throw new UnauthorizedException('Access denied');
      return conversation;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findOneBy(
    field: keyof Conversation,
    value: string,
  ): Promise<Conversation> {
    try {
      const customQuery =
        this.conversationRepository.createQueryBuilder('conv');
      customQuery.where(`conv.${field} = :value`, { value });
      customQuery.leftJoinAndSelect('conv.creator', 'creator');
      customQuery.leftJoinAndSelect('conv.members', 'members');
      customQuery.leftJoinAndSelect('conv.admins', 'admins');
      return await customQuery.getOneOrFail();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async update(
    user: User,
    id: string,
    updateConversationDto: UpdateConversationDTO,
  ): Promise<Conversation> {
    try {
      const conversation = await this.conversationRepository.findOne({
        where: { id },
        relations: { creator: true },
      });
      const isCreator = conversation.creator.id === user.id;
      if (!isCreator)
        throw new UnauthorizedException(
          'Only creator can edit the conversation',
        );
      await this.conversationRepository.update(id, updateConversationDto);
      return await this.conversationRepository.findOneBy({ id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async addMember(
    user: User,
    id: string,
    candidate: User,
  ): Promise<Conversation> {
    try {
      const conversation = await this.findOneBy('id', id);
      this.checkAccess(conversation, user);
      this.checkMembers(conversation, candidate.id);
      conversation.members = [...conversation.members, candidate];
      await this.conversationRepository.save(conversation);
      return await this.findOneBy('id', id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteMember(
    user: User,
    id: string,
    candidateId: string,
  ): Promise<Conversation> {
    try {
      const conversation = await this.findOneBy('id', id);
      this.checkAccess(conversation, user);
      conversation.members = conversation.members.filter(
        (u) => u.id !== candidateId,
      );
      const updatedConversation = await this.conversationRepository.save(
        conversation,
      );
      return updatedConversation;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  checkAccess(conversation: Conversation, user: User) {
    const isAdmin =
      conversation.creator.id === user.id ||
      conversation.admins.some((u) => u.id === user.id);

    if (!isAdmin)
      throw new UnauthorizedException(
        'Only admins can add/remove members of the conversation',
      );
  }

  checkMembers(conversation: Conversation, candidateId: string) {
    const isMember = conversation.members.some((u) => u.id === candidateId);
    if (isMember) throw new BadRequestException(`The user is already a member`);
  }

  async remove(user: User, id: string) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: { creator: true },
    });
    if (conversation.creator.id !== user.id)
      throw new UnauthorizedException(
        'Only creator can delete the conversation',
      );
    await this.conversationRepository.delete(id);
    return { id };
  }
}
