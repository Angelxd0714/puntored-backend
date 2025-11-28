// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const config = new DocumentBuilder()
    .setTitle('Puntored API')
    .setDescription('API para recargas móviles con arquitectura DDD')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación')
    .addTag('recharges', 'Recargas móviles')
    .build();

  try {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT ?? 3000;
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
    await app.listen(port);
    logger.log(`🚀 Server running on http://localhost:${port}`);
    logger.log(`🚀 Swagger running on http://localhost:${port}/api`);
  } catch (error) {
    logger.error('Failed to start server', error.stack);
    process.exit(1);
  }
}
bootstrap();
