import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '@app/modules/user/entity/user.entity';
import { IsDate } from 'class-validator';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  from: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  to: UserEntity;

  @Column()
  @IsDate()
  createdAt: Date;

  @BeforeInsert()
  createDate() {
    this.createdAt = new Date();
  }
}
