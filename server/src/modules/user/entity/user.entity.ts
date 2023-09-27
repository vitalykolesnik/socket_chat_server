import { MessageEntity } from '@app/modules/message/entity/message.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  socketId: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => MessageEntity, (message) => message.id)
  messages: MessageEntity[];
  // @ApiProperty()
  // @Column({ default: '' })
  // bio: string;

  // @ApiProperty()
  // @Column({ default: '' })
  // image: string;

  // @ApiProperty()
  // @Column()
  // username: string;
}
