import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const config = new DocumentBuilder()
    .setTitle('Puntored API')
    .setDescription('API para recargas móviles con arquitectura DDD + Event-Driven')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación')
    .addTag('recharges', 'Recargas móviles')
    .build();

  try {
    const app = await NestFactory.create(AppModule);

    // PIPE global para DTOs
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // src/main.ts
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notifications_queue',
        noAck: false,
        prefetchCount: 10,
        queueOptions: {
          durable: true
        }
      }
    });


    const port = process.env.PORT ?? 3000;
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // INICIA HTTP + MICROSERVICE
    await app.startAllMicroservices();
    await app.listen(port);

    logger.log(`🚀 HTTP Server: http://localhost:${port}`);
    logger.log(`📚 Swagger: http://localhost:${port}/api`);
    logger.log(`📡 Microservice: notifications_queue (RabbitMQ)`);

  } catch (error) {
    logger.error('Failed to start server', error.stack);
    process.exit(1);
  }
}
bootstrap();
