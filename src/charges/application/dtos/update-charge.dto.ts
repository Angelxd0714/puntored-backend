import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { z } from 'zod';

const updateChargeDtoSchema = z.object({
    phoneNumber: z.string().optional(),
    amount: z.number().min(0).optional(),
    description: z.string().optional(),
    status: z.string().optional(),
});

export class UpdateChargeDto {
    static schema = updateChargeDtoSchema;
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    amount?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
