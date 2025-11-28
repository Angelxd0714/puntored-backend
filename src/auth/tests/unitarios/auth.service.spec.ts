import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/auth/infrastructure/services/auth.service';
import { LoginUseCase } from '@/auth/application/use-cases/login.usecase';
import { RegisterUseCase } from '@/auth/application/use-cases/register.usecase';
import { LoginDto } from '@/auth/application/dtos/login.dto';
import { RegisterDto } from '@/auth/application/dtos/register.dto';

describe('AuthService', () => {
    let authService: AuthService;
    let loginUseCase: jest.Mocked<LoginUseCase>;
    let registerUseCase: jest.Mocked<RegisterUseCase>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: LoginUseCase,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: RegisterUseCase,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        loginUseCase = module.get(LoginUseCase) as jest.Mocked<LoginUseCase>;
        registerUseCase = module.get(RegisterUseCase) as jest.Mocked<RegisterUseCase>;
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
        expect(loginUseCase).toBeDefined();
        expect(registerUseCase).toBeDefined();
    });

    describe('register', () => {
        it('should call RegisterUseCase and return access token', async () => {
            const registerDto: RegisterDto = {
                username: 'test',
                password: 'test123',
            };
            const expectedResult = { accessToken: 'test-token' };

            registerUseCase.execute.mockResolvedValue(expectedResult);

            const result = await authService.register(registerDto);

            expect(registerUseCase.execute).toHaveBeenCalledWith(registerDto);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('login', () => {
        it('should call LoginUseCase and return access token', async () => {
            const loginDto: LoginDto = {
                username: 'test',
                password: 'test123',
            };
            const expectedResult = { accessToken: 'test-token' };

            loginUseCase.execute.mockResolvedValue(expectedResult);

            const result = await authService.login(loginDto);

            expect(loginUseCase.execute).toHaveBeenCalledWith(loginDto);
            expect(result).toEqual(expectedResult);
        });
    });
});
