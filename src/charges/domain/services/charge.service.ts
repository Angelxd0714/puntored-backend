import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Charge } from '../entities/charge.entity';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';
import { ChargeUseCase } from '@/charges/application/use-cases/charge.usecase';

@Injectable()
export class ChargeService {
    constructor(
        private readonly chargeRepository: ChargeUseCase,
    ) { }

    async create(createChargeDto: CreateChargeDto, userId: string): Promise<Charge> {
        const charge = await this.create(
            createChargeDto,
            userId
        )
        return charge;
    }

    async findAll(userId: string): Promise<Charge[]> {
        return await this.chargeRepository.findAll(userId);
    }

    async findOne(id: string): Promise<Charge> {
        const charge = await this.chargeRepository.findById(id);
        if (!charge) {
            throw new NotFoundException(`Charge with ID ${id} not found or you don't have access to it`);
        }
        return charge;
    }

    async update(id: string, updateChargeDto: UpdateChargeDto, userId: string): Promise<Charge> {
        const charge = await this.chargeRepository.findById(id);
        if (!charge) {
            throw new NotFoundException(`Charge with ID ${id} not found or you don't have access to it`);
        }
        Object.assign(charge, updateChargeDto);
        return await this.chargeRepository.update(id, charge);
    }

    async remove(id: string): Promise<void> {
        if (!await this.chargeRepository.findById(id)) {
            throw new NotFoundException(`Charge with ID ${id} not found or you don't have access to it`);
        }
        await this.chargeRepository.delete(id);
    }
}
