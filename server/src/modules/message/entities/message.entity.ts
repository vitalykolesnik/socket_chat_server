import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/modules/user/entities/user.entity';
import { Comment } from '@app/modules/comment/entities/comment.entity';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: true })
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'from' })
  from: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'to' })
  to: User;

  @OneToMany(() => Comment, (comment) => comment.message)
  comments: Comment[];

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: 'CASCADE',
  })
  conversation: Conversation;

  @CreateDateColumn({ name: 'created_at', select: true })
  createdAt: Date;
}
