import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
    private consumos: ConsumoAgua[] = [];

    // Registro de novo consumo de água
    registrarConsumo(usuarioId: string, quantidade: number, dataLeitura: Date): ConsumoAgua {
        const novoConsumo: ConsumoAgua = { id: Math.random().toString(), usuarioId, quantidade, dataLeitura };
        this.consumos.push(novoConsumo);
        return novoConsumo;
    }

    // Consulta de histórico de consumo entre datas
    consultarHistorico(usuarioId: string, dataInicio: Date, dataFim: Date): ConsumoAgua[] {
        return this.consumos.filter(consumo =>
            consumo.usuarioId === usuarioId &&
            consumo.dataLeitura >= dataInicio &&
            consumo.dataLeitura <= dataFim
        );
    }

    // Geração de alerta se o consumo deste mês for maior que o do mês passado
    verificarAlerta(usuarioId: string): boolean {
        const registros = this.consumos.filter(consumo => consumo.usuarioId === usuarioId);

        if (registros.length < 2) return false;  // Precisamos de pelo menos 2 registros para comparar

        const [ultimo, penultimo] = registros.slice(-2).sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());
        return ultimo.quantidade > penultimo.quantidade;
    }
}
