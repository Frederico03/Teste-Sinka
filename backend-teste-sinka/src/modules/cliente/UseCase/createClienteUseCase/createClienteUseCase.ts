import { OperadorRepository } from 'src/modules/operador/repositories/operadorRepository';
import { Injectable } from '@nestjs/common';
import { FileToCliente } from '../../../services/parseFileToCliente/fileToCliente';
import { ClienteRepository } from '../../repositories/clienteRepository';
import { OperadorNotFoundException } from 'src/modules/operador/exceptions/OperadorNotFoundException';
import { Cliente } from '../../entities/Cliente';

@Injectable()
export class CreateClienteUseCase {
  constructor(
    private operadorRepository: OperadorRepository,
    private clienteRepository: ClienteRepository,
    private fileToCliente: FileToCliente,
  ) {}

  async execute(file: Express.Multer.File): Promise<Cliente[]> {
    const existeOperador = await this.operadorRepository.findAll();
    if (existeOperador.length == 0) throw new OperadorNotFoundException();

    const clientes = await this.fileToCliente.parseFileToCliente(file);

    try {
      clientes.map(
        async (cliente) => await this.clienteRepository.create(cliente),
      );
      console.log(clientes);
      return clientes;
    } catch (err: any) {
      console.log('error');
      throw new Error(err);
    }
  }
}
