import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from '@/charges/domain/entities/charge.entity';
import { NotificationsController } from './notification/notifications.consumer';
@Module({
    imports: [TypeOrmModule.forFeature([Charge])],
    providers: [NotificationsController],
    exports: [NotificationsController],
    controllers: [NotificationsController]
})
export class NotificationsModule { }
