import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
