import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, Max, Matches } from 'class-validator';

export class CreateChargeDto {
    @IsString()
    @ApiProperty({ example: '3001234567' })
    @IsNotEmpty()
    @Transform(({ value }) => value?.toString().replace(/\s+/g, ''))
    @Matches(/^(\+?57)?[3-9]\d{9}$/, {
        message: 'Número móvil colombiano inválido. Use: 3001234567 o +573001234567'
    })
    phoneNumber: string;

    @IsNumber()
    @ApiProperty({ example: 10000 })
    @Min(1000, { message: 'El monto debe ser mayor o igual a 1000' })
    @Max(1000000, { message: 'El monto debe ser menor o igual a 1000000' })
    @IsNotEmpty()
    amount: number;

    @IsString()
    @ApiProperty({ example: 'Recarga de prueba' })
    @IsNotEmpty()
    description: string;
}
