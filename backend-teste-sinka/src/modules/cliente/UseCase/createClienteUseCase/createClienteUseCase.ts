import { OperadorRepository } from '../../../operador/repositories/operadorRepository';
import { Injectable } from '@nestjs/common';
import { FileToCliente } from '../../../services/parseFileToCliente/fileToCliente';
import { ClienteRepository } from '../../repositories/clienteRepository';
import { OperadorNotFoundException } from '../../../operador/exceptions/OperadorNotFoundException';

@Injectable()
export class CreateClienteUseCase {
  constructor(
    private operadorRepository: OperadorRepository,
    private clienteRepository: ClienteRepository,
    private fileToCliente: FileToCliente,
  ) {}

  async execute(file: Express.Multer.File): Promise<boolean> {
    const existeOperador = await this.operadorRepository.findAll();
    if (existeOperador.length == 0) throw new OperadorNotFoundException();

    const clientes = await this.fileToCliente.parseFileToCliente(file);

    if (!clientes) throw new Error('arquivo vazio');

    await Promise.all(
      clientes.map(async (cliente) => {
        const existeCliente = await this.clienteRepository.findById(cliente.id);
        if (!existeCliente) {
          await this.clienteRepository.create(cliente);
        }
      }),
    );

    return true;
  }
}
