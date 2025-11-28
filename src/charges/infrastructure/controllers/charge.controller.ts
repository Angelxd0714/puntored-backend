import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ChargeService } from '../../domain/services/charge.service';
import { CreateChargeDto } from '../../application/dtos/create-charge.dto';
import { UpdateChargeDto } from '../../application/dtos/update-charge.dto';
import { JwtAuthGuard } from '@/auth/infrastructure/guards/jwt-auth.guard';
import { GetUser } from '@/auth/infrastructure/decorators/get-user.decorator';
import type { JwtUser } from '@/auth/domain/interfaces/jwt-user.interface';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('recharges')
@Controller('recharges')
@UseGuards(JwtAuthGuard)
export class ChargeController {
    constructor(private readonly chargeService: ChargeService) { }

    @Post("/buy")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Realizar una recarga' })
    @ApiResponse({
        status: 200, description: 'Recarga exitosa'
    })
    create(@Body() createChargeDto: CreateChargeDto, @GetUser() user: JwtUser) {
        return this.chargeService.create(createChargeDto, user.userId);
    }

    @Get("/history")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el historial de recargas' })
    @ApiResponse({ status: 200, description: 'Historial de recargas obtenido exitosamente' })
    findAll(@GetUser() user: JwtUser) {
        return this.chargeService.findAll(user.userId);
    }

    @Get("/history/:id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener una recarga por ID' })
    @ApiResponse({ status: 200, description: 'Recarga obtenida exitosamente' })
    findOne(@Param('id') id: string) {
        return this.chargeService.findOne(id);
    }

    @Put("/:id")
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar una recarga' })
    @ApiResponse({ status: 200, description: 'Recarga actualizada exitosamente' })
    update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto, @GetUser() user: JwtUser) {
        return this.chargeService.update(id, updateChargeDto, user.userId);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar una recarga' })
    @ApiResponse({ status: 200, description: 'Recarga eliminada exitosamente' })
    @ApiNoContentResponse()
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        await this.chargeService.remove(id);
        return { message: 'Recarga eliminada exitosamente' };
    }

}
