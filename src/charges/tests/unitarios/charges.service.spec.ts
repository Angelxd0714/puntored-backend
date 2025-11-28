import { Test, TestingModule } from '@nestjs/testing';
import { ChargeService } from '@/charges/domain/services/charge.service';
import { ClientProxy } from '@nestjs/microservices';
import { Charge } from '@/charges/domain/entities/charge.entity';
import { ChargeStatus } from '@/charges/domain/entities/enums/types.enum';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { ChargeRepository } from '@/charges/application/interfaces/repository.inteface';

describe('ChargeService', () => {
    let service: ChargeService;
    let repository: jest.Mocked<ChargeRepository>;
    let notificationsClient: jest.Mocked<ClientProxy>;

    const mockCharge: Charge = {
        id: 'charge-123',
        phoneNumber: '3001234567',
        amount: 10000,
        description: 'Test recharge',
        status: ChargeStatus.PENDING,
        userId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChargeService,
                {
                    provide: 'ChargeRepository',
                    useValue: {
                        save: jest.fn(),
                        findAll: jest.fn(),
                        findById: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: 'NOTIFICATIONS_SERVICE',
                    useValue: {
                        emit: jest.fn().mockReturnValue(of(true)),
                    },
                },
            ],
        }).compile();

        service = module.get<ChargeService>(ChargeService);
        repository = module.get('ChargeRepository');
        notificationsClient = module.get('NOTIFICATIONS_SERVICE');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a charge and emit notification', async () => {
            const createDto = {
                phoneNumber: '3001234567',
                amount: 10000,
                description: 'Test recharge',
            };
            const userId = 'user-123';

            repository.save.mockResolvedValue(mockCharge);

            const result = await service.create(createDto, userId);

            expect(repository.save).toHaveBeenCalledWith(
                expect.objectContaining({
                    phoneNumber: createDto.phoneNumber,
                    amount: createDto.amount,
                    userId,
                    status: ChargeStatus.PENDING,
                }),
                userId,
            );
            expect(notificationsClient.emit).toHaveBeenCalledWith('charge.created', mockCharge);
            expect(result).toEqual(mockCharge);
        });
    });

    describe('findAll', () => {
        it('should return an array of charges', async () => {
            const userId = 'user-123';
            repository.findAll.mockResolvedValue([mockCharge]);

            const result = await service.findAll(userId);

            expect(repository.findAll).toHaveBeenCalledWith(userId);
            expect(result).toEqual([mockCharge]);
        });
    });

    describe('findOne', () => {
        it('should return a charge if found', async () => {
            repository.findById.mockResolvedValue(mockCharge);

            const result = await service.findOne('charge-123');

            expect(repository.findById).toHaveBeenCalledWith('charge-123');
            expect(result).toEqual(mockCharge);
        });

        it('should throw NotFoundException if charge not found', async () => {
            repository.findById.mockResolvedValue(null);

            await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a charge if found', async () => {
            const updateDto = { description: 'Updated description' };
            const userId = 'user-123';
            const updatedCharge = { ...mockCharge, ...updateDto };

            repository.findById.mockResolvedValue(mockCharge);
            repository.update.mockResolvedValue(updatedCharge);

            const result = await service.update('charge-123', updateDto, userId);

            expect(repository.findById).toHaveBeenCalledWith('charge-123');
            expect(repository.update).toHaveBeenCalledWith('charge-123', expect.objectContaining(updateDto));
            expect(result).toEqual(updatedCharge);
        });

        it('should throw NotFoundException if charge to update not found', async () => {
            repository.findById.mockResolvedValue(null);

            await expect(service.update('invalid-id', {}, 'user-123')).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a charge if found', async () => {
            repository.findById.mockResolvedValue(mockCharge);
            repository.delete.mockResolvedValue({ raw: [], affected: 1 });

            await service.remove('charge-123');

            expect(repository.findById).toHaveBeenCalledWith('charge-123');
            expect(repository.delete).toHaveBeenCalledWith('charge-123');
        });

        it('should throw NotFoundException if charge to remove not found', async () => {
            repository.findById.mockResolvedValue(null);

            await expect(service.remove('invalid-id')).rejects.toThrow(NotFoundException);
        });
    });
});
