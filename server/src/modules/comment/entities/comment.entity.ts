import { Message } from '@app/modules/message/entities/message.entity';
import { User } from '@app/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commenter' })
  author: User;

  @ManyToOne(() => Message, (message) => message.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commented_message' })
  message: Message;

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: Date;
}
