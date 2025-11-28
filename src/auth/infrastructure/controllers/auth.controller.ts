import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '@/auth/infrastructure/services/auth.service';
import { LoginDto } from '@/auth/application/dtos/login.dto';
import { RegisterDto } from '@/auth/application/dtos/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Autenticar usuario' })
    @ApiResponse({
        status: 200, description: 'Login exitoso', schema: {
            example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        }
    })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Registrar usuario' })
    @ApiResponse({
        status: 200, description: 'Usuario registrado exitosamente', schema: {
            example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
        }
    })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
