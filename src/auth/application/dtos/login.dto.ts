import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class LoginDto {
    @ApiProperty({ example: 'pepito' })
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
    @ApiProperty({ example: '212323' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}