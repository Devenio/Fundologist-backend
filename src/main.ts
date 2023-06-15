import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { config } from 'dotenv';
import helmet from 'helmet';
import { AppModule } from './app.module';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fundologist Document')
    .setDescription('The Fundologist API description')
    .setVersion('1.0')
    .addTag('fundologist')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(helmet());

  if(process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: process.env.FRONTEND_BASE_URL
    })
  }

  await app.listen(process.env.PORT || 8080, '0.0.0.0');
}
bootstrap();
