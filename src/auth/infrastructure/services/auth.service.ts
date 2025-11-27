import { Injectable } from '@nestjs/common';
import { LoginDto } from '@/auth/application/dtos/login.dto';
import { LoginUseCase } from '@/auth/application/use-cases/login.usecase';
import { RegisterUseCase } from '@/auth/application/use-cases/register.usecase';
import { RegisterDto } from '@/auth/application/dtos/register.dto';
@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase
  ) {}

  async login(loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
  async register(registerDto: RegisterDto) {
    return this.registerUseCase.execute(registerDto);
  }
}