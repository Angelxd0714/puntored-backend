import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './domain/entities/charge.entity';
import { ChargeService } from './domain/services/charge.service';
import { ChargeController } from './infrastructure/controllers/charge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Charge])],
  providers: [ChargeService],
  controllers: [ChargeController],
  exports: [ChargeService],
})
export class ChargesModule {}
