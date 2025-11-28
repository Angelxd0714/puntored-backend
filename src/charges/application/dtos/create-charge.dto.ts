import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min, Matches } from 'class-validator';
import z from 'zod';

const validate = z.object({
    phoneNumber: z.string().regex(/^(\+57)?3\d{9}$/),
    amount: z.number().min(0),
    description: z.string(),
});

export class CreateChargeDto {
    schema = validate;
    @IsString()
    @ApiProperty({ example: '3001234567' })
    @IsNotEmpty()
    @Matches(/^\+?57\d{9}$/, { message: 'El número de teléfono debe ser un número móvil colombiano válido (ej: 3001234567 o +573001234567)' })
    phoneNumber: string;

    @IsNumber()
    @ApiProperty({ example: '10000' })
    @Min(0)
    @IsNotEmpty()
    amount: number;

    @IsString()
    @ApiProperty({ example: 'Recarga de prueba' })
    @IsNotEmpty()
    description: string;
}

