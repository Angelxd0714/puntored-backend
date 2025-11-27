import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Charge } from '../entities/charge.entity';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';

@Injectable()
export class ChargeService {
    constructor(
        @InjectRepository(Charge)
        private readonly chargeRepository: Repository<Charge>,
    ) {}

    async create(createChargeDto: CreateChargeDto): Promise<Charge> {
        const charge = this.chargeRepository.create(createChargeDto);
        return await this.chargeRepository.save(charge);
    }

    async findAll(): Promise<Charge[]> {
        return await this.chargeRepository.find();
    }

    async findOne(id: string): Promise<Charge> {
        const charge = await this.chargeRepository.findOne({ where: { id } });
        if (!charge) {
            throw new NotFoundException(`Charge with ID ${id} not found`);
        }
        return charge;
    }

    async update(id: string, updateChargeDto: UpdateChargeDto): Promise<Charge> {
        const charge = await this.findOne(id);
        Object.assign(charge, updateChargeDto);
        return await this.chargeRepository.save(charge);
    }

    async remove(id: string): Promise<void> {
        const charge = await this.findOne(id);
        await this.chargeRepository.remove(charge);
    }
}
