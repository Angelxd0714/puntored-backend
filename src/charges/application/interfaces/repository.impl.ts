import { Charge } from "@/charges/domain/entities/charge.entity";
import { ChargeRepository } from "./repository.inteface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult, UpdateResult } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class ChargeRepositoryImpl implements ChargeRepository {
    constructor(
        @InjectRepository(Charge)
        private readonly chargeRepository: Repository<Charge>
    ) { }
    save(charge: Charge): Promise<Charge> {
        return this.chargeRepository.save(charge);
    }
    findAll(userId: string): Promise<Charge[]> {
        return this.chargeRepository.find({ where: { userId } });
    }
    findById(id: string): Promise<Charge | null> {
        return this.chargeRepository.findOneBy({ id });
    }
    async update(id: string, chargeData: Partial<Charge>): Promise<Charge> {
        const charge = await this.chargeRepository.findOneBy({ id });
        if (!charge) {
            throw new NotFoundException(`Charge with ID ${id} not found`);
        }

        Object.assign(charge, chargeData);
        return await this.chargeRepository.save(charge);
    }
    delete(id: string): Promise<DeleteResult> {
        return this.chargeRepository.delete(id);
    }

}