import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Matches } from 'class-validator';

export class UpdateChargeDto {
    @ApiProperty({ example: '3001234567' })
    @IsString()
    @IsOptional()
    @Matches(/^\+?57[3-9]\d{8}$/)
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
