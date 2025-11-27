import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ChargeService } from '../../domain/services/charge.service';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';
import { JwtAuthGuard } from '@/auth/infrastructure/guards/jwt-auth.guard';
import { GetUser } from '@/auth/infrastructure/decorators/get-user.decorator';
import type { JwtUser } from '@/auth/domain/interfaces/jwt-user.interface';

@Controller('charges')
@UseGuards(JwtAuthGuard)
export class ChargeController {
    constructor(private readonly chargeService: ChargeService) {}

    @Post()
    create(@Body() createChargeDto: CreateChargeDto, @GetUser() user: JwtUser) {
        return this.chargeService.create(createChargeDto, user.userId);
    }

    @Get()
    findAll(@GetUser() user: JwtUser) {
        return this.chargeService.findAll(user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @GetUser() user: JwtUser) {
        return this.chargeService.findOne(id, user.userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto, @GetUser() user: JwtUser) {
        return this.chargeService.update(id, updateChargeDto, user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() user: JwtUser) {
        return this.chargeService.remove(id, user.userId);
    }
}
