import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { UserRepositoryImpl } from './application/interfaces/repositoryImpl';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthDomainService } from './domain/services/auth-domain.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JWT_CONSTANTS } from '@/common/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '1h' },
    })],
  providers: [AuthService,LoginUseCase,UserRepositoryImpl,JwtService,AuthDomainService,JwtStrategy,AuthDomainService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
