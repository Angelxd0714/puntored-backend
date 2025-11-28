import { ApiProperty } from '@nestjs/swagger';
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
    @ApiProperty({ example: '3001234567' })
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ example: '10000' })
    @IsNumber()
    @Min(0)
    @IsOptional()
    amount?: number;

    @ApiProperty({ example: 'Recarga de prueba' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 'pending' })
    @IsString()
    @IsOptional()
    status?: string;
}
