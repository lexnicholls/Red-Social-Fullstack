import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MongoDB Book REST API')
    .setDescription('API REST para Paya con MongoDB')
    .setVersion('1.0')
    .build();

  app.setViewEngine('ejs');
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
