import { Injectable } from '@nestjs/common';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { AssociateClienteOperador } from 'src/modules/services/associateClienteOperador/associateClienteOperador';

@Injectable()
export class EditClientesUseCase {
  constructor(
    private associateClienteOperador: AssociateClienteOperador,
    private clienteRepository: ClienteRepository,
  ) {}

  async execute() {
    try {
      const existeClientes = await this.clienteRepository.findAll();
      if (existeClientes) await this.associateClienteOperador.setEditClientes();
      return true;
    } catch (err) {
      console.error(
        'An error occurred while executing EditClientesUseCase:',
        err,
      );
      return false;
    }
  }
}
