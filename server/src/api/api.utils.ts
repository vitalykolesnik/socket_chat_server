import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createDocumentation = (path: string, app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Blog_NestJS')
    .setDescription('The Blog_NestJS API description')
    .setVersion('1.0.0')
    .addTag('user')
    .addTag('info')
    .addTag('conversation')
    .addTag('message')
    .addTag('comment')
    .addBearerAuth(
      {
        description: 'JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
