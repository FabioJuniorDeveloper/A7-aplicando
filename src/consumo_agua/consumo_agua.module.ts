// src/consumo_agua/consumo_agua.module.ts
import { Module } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAguaController } from './consumo_agua.controller';

@Module({
  providers: [ConsumoAguaService],
  controllers: [ConsumoAguaController],
})
export class ConsumoAguaModule { }
