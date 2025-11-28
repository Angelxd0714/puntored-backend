import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChargeStatus } from "./enums/types.enum";

@Entity('Charge')
export class Charge {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phoneNumber: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: ChargeStatus, default: ChargeStatus.PENDING })
    status: ChargeStatus;

    @Column({ nullable: true })
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
export { ChargeStatus };

