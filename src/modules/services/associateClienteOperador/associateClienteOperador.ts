import { OperadorRepository } from 'src/modules/operador/repositories/operadorRepository';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociateClienteOperador {
  constructor(
    private clienteRepository: ClienteRepository,
    private operadorRepository: OperadorRepository,
  ) {}

  async setEditClientes() {
    const sortedOperadores = await this.sortByNameOperadores();
    const sortedClientes = await this.sortByNameCliente();
    let index = 0;

    for (const cliente of sortedClientes) {
      cliente.operadorId = sortedOperadores[index].id;

      await this.clienteRepository.save(cliente);
      index = (index + 1) % sortedOperadores.length;
    }
  }

  async sortByNameOperadores() {
    const operador = await this.operadorRepository.findAll();
    return operador.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }

  async sortByNameCliente() {
    const clientes = await this.clienteRepository.findAll();
    return clientes!.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
  }
}
