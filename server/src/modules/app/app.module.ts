import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@app/ormconfig';
import { AuthMiddleware } from '@app/middleware/auth.middleware';
import { UserModule } from '@app/modules/user/user.module';
import { MessageModule } from '@app/modules/message/message.module';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    MessageModule,
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
