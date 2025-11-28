import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './domain/entities/user.entity';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { AuthDomainService } from './domain/services/auth-domain.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JWT_CONSTANTS } from '@/common/constants';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { UserRepositoryImpl } from './application/interfaces/repositoryImpl';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUseCase,
    AuthDomainService,
    RegisterUseCase,
    JwtStrategy,
    UserRepositoryImpl
  ],
  exports: [AuthService],
})
export class AuthModule { }
