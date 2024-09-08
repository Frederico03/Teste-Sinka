import { Injectable } from '@nestjs/common';
import { OperadorRepository } from 'src/modules/operador/repositories/operadorRepository';

interface OperadoresOrdenados {
  operadorId: string;
  nome: string;
  count: number;
}

@Injectable()
export class OperadorSort {
  constructor(private operadorRepository: OperadorRepository) {}

  async getContagemClientesPorOperador() {
    return await this.operadorRepository.countClientesByOperador();
  }

  async sortOperadores(): Promise<OperadoresOrdenados[]> {
    const contagemClientes = await this.getContagemClientesPorOperador();
    contagemClientes.sort((a: any, b: any) => {
      if (a.count === b.count) {
        // Se a contagem for a mesma, ordena pelo nome do operador
        return a.nome.localeCompare(b.nome);
      }
      return a.count - b.count;
    });
    return contagemClientes;
  }
}
