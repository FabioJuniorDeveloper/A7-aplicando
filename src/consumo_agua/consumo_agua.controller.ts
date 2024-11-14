import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo-agua')
export class ConsumoAguaController {
    constructor(private readonly consumoAguaService: ConsumoAguaService) { }

    @Post('registrar')
    registrarConsumo(
        @Body('usuarioId') usuarioId: string,
        @Body('quantidade') quantidade: number,
        @Body('dataLeitura') dataLeitura: string,
    ): ConsumoAgua {
        return this.consumoAguaService.registrarConsumo(usuarioId, quantidade, new Date(dataLeitura));
    }

    @Get('historico/:usuarioId')
    consultarHistorico(
        @Param('usuarioId') usuarioId: string,
        @Query('dataInicio') dataInicio: string,
        @Query('dataFim') dataFim: string,
    ): ConsumoAgua[] {
        return this.consumoAguaService.consultarHistorico(usuarioId, new Date(dataInicio), new Date(dataFim));
    }

    @Get('alerta/:usuarioId')
    verificarAlerta(@Param('usuarioId') usuarioId: string): { alerta: boolean } {
        return { alerta: this.consumoAguaService.verificarAlerta(usuarioId) };
    }
}
