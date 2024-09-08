import { OperadorRepository } from 'src/modules/operador/repositories/operadorRepository';
import { Injectable } from '@nestjs/common';
import { FileToCliente } from '../../../services/parseFileToCliente/fileToCliente';
import { ClienteRepository } from '../../repositories/clienteRepository';
import { OperadorNotFoundException } from 'src/modules/operador/exceptions/OperadorNotFoundException';

@Injectable()
export class CreateClienteUseCase {
  constructor(
    private operadorRepository: OperadorRepository,
    private clienteRepository: ClienteRepository,
    private fileToCliente: FileToCliente,
  ) {}

  async execute(file: Express.Multer.File): Promise<boolean> {
    const operador = await this.operadorRepository.findAll();
    if (operador.length == 0) throw new OperadorNotFoundException();

    const clientes = await this.fileToCliente.parseFileToCliente(file);

    clientes.map((cliente) => this.clienteRepository.create(cliente));

    return true;
  }
}
