import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../../repositories/clienteRepository';
import { AssociateClienteOperador } from '../../../services/associateClienteOperador/associateClienteOperador';

@Injectable()
export class EditClientesUseCase {
  constructor(
    private associateClienteOperador: AssociateClienteOperador,
    private clienteRepository: ClienteRepository,
  ) {}

  async execute(operadorId?: string) {
    try {
      const existeClientes = await this.clienteRepository.findAll();

      if (existeClientes) {
        await this.associateClienteOperador.setEditClientes(operadorId);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      console.log('err -->' + err);
      return false;
    }
    return true;
  }
}
