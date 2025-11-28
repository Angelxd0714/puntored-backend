import { Injectable, NotFoundException } from '@nestjs/common';
import { Charge } from '../entities/charge.entity';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';
import { ChargeRepositoryImpl } from '@/charges/application/interfaces/repository.impl';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ChargeStatus } from '../entities/enums/types.enum';
@Injectable()
export class ChargeService {
    constructor(
        private readonly chargeRepository: ChargeRepositoryImpl,
        @Inject('NOTIFICATIONS_SERVICE')
        private readonly notificationsClient: ClientProxy,
    ) { }

    async create(createChargeDto: CreateChargeDto, userId: string): Promise<Charge> {
        const charge = new Charge();
        charge.phoneNumber = createChargeDto.phoneNumber;
        charge.amount = createChargeDto.amount;
        charge.description = createChargeDto.description;
        charge.userId = userId;
        charge.status = ChargeStatus.PENDING;
        const savedCharge = await this.chargeRepository.save(charge, userId);
        this.notificationsClient.emit('charge.created', savedCharge).subscribe();
        return savedCharge;
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
