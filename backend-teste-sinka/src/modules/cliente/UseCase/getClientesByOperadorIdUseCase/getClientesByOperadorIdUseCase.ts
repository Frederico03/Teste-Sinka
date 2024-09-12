import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../../repositories/clienteRepository';
import { SortData } from '../../../services/sortData/sortData';
import { Cliente } from '../../entities/Cliente';

interface GetClientesByOperadorIdRequest {
  operadorId: string;
}

@Injectable()
export class GetClientesByOperadorIdUseCase {
  constructor(
    private clienteRepository: ClienteRepository,
    private sortData: SortData,
  ) {}

  async execute({ operadorId }: GetClientesByOperadorIdRequest) {
    let clientes: Cliente[] | undefined =
      await this.clienteRepository.findManyById(operadorId);
    clientes = await this.sortData.sortClienteByCreate(clientes);
    return clientes;
  }
}
