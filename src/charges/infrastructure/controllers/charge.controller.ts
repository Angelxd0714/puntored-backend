import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChargeService } from '../../domain/services/charge.service';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';

@Controller('charges')
export class ChargeController {
    constructor(private readonly chargeService: ChargeService) {}

    @Post()
    create(@Body() createChargeDto: CreateChargeDto) {
        return this.chargeService.create(createChargeDto);
    }

    @Get()
    findAll() {
        return this.chargeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chargeService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
        return this.chargeService.update(id, updateChargeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chargeService.remove(id);
    }
}
