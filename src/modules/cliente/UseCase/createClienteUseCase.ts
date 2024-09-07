import { Injectable } from '@nestjs/common';
import { fileToCliente } from 'src/utils/fileToCliente';
import { Cliente } from '../entities/Cliente';
import { ClienteRepository } from '../repositories/clienteRepository';

@Injectable()
export class CreateClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute(file: Express.Multer.File): Promise<boolean> {
    const clientes: Cliente[] = await fileToCliente(file);

    await Promise.all(
      clientes.map((cliente) => this.clienteRepository.create(cliente)),
    );

    return true;
  }
}
