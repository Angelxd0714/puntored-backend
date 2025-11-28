import { Charge, ChargeStatus } from '@/charges/domain/entities/charge.entity';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class NotificationsController {
    constructor(
        @InjectRepository(Charge)
        private chargeRepository: Repository<Charge>,
    ) {
        console.log('🚀 [MICROSERVICE] NotificationsController iniciado');
    }

    @EventPattern('charge.created')
    async handleChargeCreated(@Payload() chargeData: Charge, @Ctx() context: RmqContext) {
        console.log('📦 [CONSUMER] Payload recibido:', chargeData.id);

        if (!chargeData?.id) {
            console.error('❌ [CONSUMER] Sin ID');
            return;
        }

        try {
            console.log('🔄 [CONSUMER] Actualizando:', chargeData.id);

            const result = await this.chargeRepository.update(
                { id: chargeData.id },
                { status: ChargeStatus.SUCCESS }
            );

            console.log('✅ [CONSUMER] Resultado:', result.affected);

        } catch (error) {
            console.error('❌ [CONSUMER] Error:', error.message);
            return;
        }

    }

}
