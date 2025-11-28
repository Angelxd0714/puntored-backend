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

    async create(createChargeDto: CreateChargeDto, userId: string): Promise<Charge> {
        const charge = this.chargeRepository.create({
            ...createChargeDto,
            userId, 
        });
        return await this.chargeRepository.save(charge);
    }

    async findAll(userId: string): Promise<Charge[]> {
        // Filtrar cargos solo del usuario autenticado
        return await this.chargeRepository.find({ where: { userId } });
    }

    async findOne(id: string, userId: string): Promise<Charge> {
        const charge = await this.chargeRepository.findOne({ where: { id, userId } });
        if (!charge) {
            throw new NotFoundException(`Charge with ID ${id} not found or you don't have access to it`);
        }
        return charge;
    }

    async update(id: string, updateChargeDto: UpdateChargeDto, userId: string): Promise<Charge> {
        const charge = await this.findOne(id, userId);
        Object.assign(charge, updateChargeDto);
        return await this.chargeRepository.save(charge);
    }

    async remove(id: string, userId: string): Promise<void> {
        const charge = await this.findOne(id, userId);
        await this.chargeRepository.remove(charge);
    }
}
