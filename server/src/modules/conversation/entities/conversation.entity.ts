import { Message } from '@app/modules/message/entities/message.entity';
import { User } from '@app/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, select: true })
  title: string;

  @Column({ nullable: true, select: true })
  icon: string;

  @CreateDateColumn({ name: 'created_at', select: true })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.conversation)
  creator: User;

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: 'conversation_members',
    joinColumn: { name: 'conversation' },
    inverseJoinColumn: { name: 'member' },
  })
  members: User[];

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: 'conversation_admins',
    joinColumn: { name: 'conversation' },
    inverseJoinColumn: { name: 'admin' },
  })
  admins: User[];
}
