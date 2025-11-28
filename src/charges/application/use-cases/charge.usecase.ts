import { Injectable } from "@nestjs/common";
import { ChargeRepositoryImpl } from "../interfaces/repository.impl";
import { Charge } from "@/charges/domain/entities/charge.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Injectable()
export class ChargeUseCase {
    constructor(
        private readonly chargeRepository: ChargeRepositoryImpl
    ) { }
    async execute(charge: Charge): Promise<Charge> {
        return this.chargeRepository.save(charge);
    }
    async findAll(userId: string): Promise<Charge[]> {
        return this.chargeRepository.findAll(userId);
    }
    async findById(id: string): Promise<Charge | null> {
        return this.chargeRepository.findById(id);
    }
    async update(id: string, chargeData: Partial<Charge>): Promise<Charge> {
        return this.chargeRepository.update(id, chargeData);
    }
    async delete(id: string): Promise<DeleteResult> {
        return this.chargeRepository.delete(id);
    }
}