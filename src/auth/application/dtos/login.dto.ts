import { IsNotEmpty, IsString } from "class-validator";
import { z } from "zod";

const loginDtoSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20),
});

export class LoginDto {
    static schema = loginDtoSchema;
    @IsString()
    @IsNotEmpty({ message: 'Username is required' })
    username: string;
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}