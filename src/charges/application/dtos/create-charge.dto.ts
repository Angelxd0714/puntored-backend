import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateChargeDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    userId?: string;
}
