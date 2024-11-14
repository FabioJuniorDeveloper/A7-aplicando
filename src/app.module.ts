// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConsumoAguaModule } from './consumo_agua/consumo_agua.module';

@Module({
  imports: [ConsumoAguaModule],
})
export class AppModule { }
