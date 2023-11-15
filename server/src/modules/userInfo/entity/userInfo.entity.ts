import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@app/modules/user/entities/user.entity';

@Entity({ name: 'user_info' })
export class UserInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ length: 50, nullable: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ length: 500, nullable: true })
  about: string;
}
