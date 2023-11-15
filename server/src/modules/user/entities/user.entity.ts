import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Conversation } from '@app/modules/conversation/entities/conversation.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'socket_id', nullable: true })
  socketId: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => UserInfo, (info) => info.user)
  info: UserInfo;

  @OneToMany(() => Conversation, (conv) => conv.creator)
  conversation: Conversation;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'friendship',
    joinColumn: { name: 'user' },
    inverseJoinColumn: { name: 'friend' },
  })
  friends: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
