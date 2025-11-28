import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './domain/entities/charge.entity';
import { ChargeService } from './domain/services/charge.service';
import { ChargeController } from './infrastructure/controllers/charge.controller';
import { ChargeUseCase } from './application/use-cases/charge.usecase';
import { ChargeRepositoryImpl } from './application/interfaces/repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Charge])],
  providers: [ChargeService, ChargeUseCase, ChargeRepositoryImpl],
  controllers: [ChargeController],
  exports: [ChargeService],
})
export class ChargesModule { }
