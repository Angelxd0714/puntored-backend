import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { z } from "zod";

const registerDtoSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
});

export class RegisterDto {
    static schema = registerDtoSchema;
    @ApiProperty({ example: 'pepito' })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
    @ApiProperty({ example: '212323' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}