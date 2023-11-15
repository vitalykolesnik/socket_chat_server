import { Comment } from '@app/modules/comment/entities/comment.entity';

export interface CommentsResponseInterface {
  comments: Comment[];
  count: number;
}
