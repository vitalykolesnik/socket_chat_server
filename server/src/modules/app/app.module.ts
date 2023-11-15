import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@app/ormconfig';
import { AuthMiddleware } from '@app/middleware/auth.middleware';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';
import { UserModule } from '@app/modules/user/user.module';
import { MessageModule } from '@app/modules/message/message.module';
import { UserInfoModule } from '@app/modules/userInfo/userInfo.module';
import { CommentModule } from '@app/modules/comment/comment.module';
import { ConversationModule } from '@app/modules/conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    UserInfoModule,
    MessageModule,
    CommentModule,
    ConversationModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
