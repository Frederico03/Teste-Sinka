import { SortData } from '../sortData/sortData';
import { ClienteRepository } from '../../cliente/repositories/clienteRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociateClienteOperador {
  constructor(
    private clienteRepository: ClienteRepository,
    private sortData: SortData,
  ) {}

  async setEditClientes(operadorId?: string) {
    let sortedOperadores = await this.sortData.sortOperadoresByCreate();
    const sortedClientes = await this.sortData.sortClienteByCreate();
    let index = 0;

    if (operadorId)
      sortedOperadores = sortedOperadores.filter(
        (operador) => operador.id !== operadorId,
      );

    if (sortedClientes) {
      for (const cliente of sortedClientes) {
        cliente.operadorId = sortedOperadores[index].id;

        await this.clienteRepository.save(cliente);
        index = (index + 1) % sortedOperadores.length;
      }
    }
  }
}
