import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepositoryImpl } from "../interfaces/repository.Impl";
import { LoginDto } from "../dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthDomainService } from "@/auth/domain/services/auth-domain.service";
@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepositoryImpl,
        private readonly authDomainService: AuthDomainService,
        private readonly jwtService: JwtService,
    ) { }

    async execute(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.authDomainService.validateCredentials(loginDto, user);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}