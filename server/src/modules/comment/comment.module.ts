import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from '@app/modules/comment/comment.service';
import { CommentController } from '@app/modules/comment/comment.controller';
import { Comment } from '@app/modules/comment/entities/comment.entity';
import { UserModule } from '@app/modules/user/user.module';
import { MessageModule } from '@app/modules/message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), MessageModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
