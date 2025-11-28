import { Injectable, BadRequestException } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepositoryImpl } from "../interfaces/repository.Impl";
import { PasswordService } from "@/common/utils/password.service";
import { User } from "@/auth/domain/entities/user.entity";
@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly userRepository: UserRepositoryImpl,
        private readonly jwtService: JwtService,
    ) { }

    async execute(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findByUsername(registerDto.username);
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }

        const hashedPassword = await PasswordService.hashPassword(registerDto.password);
        const newUser = await this.userRepository.save({
            username: registerDto.username,
            passwordhash: hashedPassword,
        } as unknown as User);

        const payload = { sub: newUser.id, username: newUser.username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}