import { Charge } from "@/charges/domain/entities/charge.entity";
import { DeleteResult, UpdateResult } from "typeorm";


export interface ChargeRepository {
    save(charge: Charge, userId: string): Promise<Charge>;
    findAll(userId: string): Promise<Charge[]>;
    findById(id: string): Promise<Charge | null>;
    update(id: string, chargeData: Partial<Charge>): Promise<Charge>;
    delete(id: string): Promise<DeleteResult>;
}