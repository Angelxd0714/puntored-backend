import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { UserRepository } from "../interfaces/repository.interfaces";
import { LoginDto } from "../dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthDomainService } from "@/auth/domain/services/auth-domain.service";
@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    private readonly authDomainService: AuthDomainService,
        private readonly jwtService: JwtService,
    ) {}

    async execute(loginDto: LoginDto): Promise<{accessToken: string}> {
        const user = await this.userRepository.findByUsername(loginDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await this.authDomainService.validateUserPassword(user, loginDto.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}