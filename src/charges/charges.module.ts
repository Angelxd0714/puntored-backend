import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './domain/entities/charge.entity';
import { ChargeService } from './domain/services/charge.service';
import { ChargeController } from './infrastructure/controllers/charge.controller';
import { ChargeRepositoryImpl } from './application/interfaces/repository.impl';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [TypeOrmModule.forFeature([Charge]),
  ClientsModule.register([
    {
      name: 'NOTIFICATIONS_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: { durable: true },
      },
    },
  ])],
  providers: [ChargeService, ChargeRepositoryImpl],
  controllers: [ChargeController],
  exports: [ChargeService],
})
export class ChargesModule { }
