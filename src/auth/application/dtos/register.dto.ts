import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {
    @ApiProperty({ example: 'pepito' })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
    @ApiProperty({ example: '212323' })
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}