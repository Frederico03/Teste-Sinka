import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/modules/cliente/entities/Cliente';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { Operador } from 'src/modules/operador/entities/Operador';
import { OperadorRepository } from 'src/modules/operador/repositories/operadorRepository';

@Injectable()
export class SortData {
  constructor(
    private operadorRepository: OperadorRepository,
    private clienteRepository: ClienteRepository,
  ) {}

  async getOperadores() {
    return await this.operadorRepository.findAll();
  }

  async sortOperadoresByCreate(operadores?: Operador[]): Promise<Operador[]> {
    const sortOperadores = !operadores
      ? await this.getOperadores()
      : operadores;
    sortOperadores.sort((a: any, b: any) => {
      return (
        new Date(a.props.criado_em).getTime() -
        new Date(b.props.criado_em).getTime()
      );
    });
    return sortOperadores;
  }

  async getCliente() {
    return await this.clienteRepository.findAll();
  }

  async sortClienteByCreate(
    cliente?: Cliente[],
  ): Promise<Cliente[] | undefined> {
    const sortCliente = !cliente ? await this.getCliente() : cliente;
    if (sortCliente) {
      sortCliente.sort((a: any, b: any) => {
        return (
          new Date(a.props.criado_em).getTime() -
          new Date(b.props.criado_em).getTime()
        );
      });
      return sortCliente;
    }
    return;
  }
}
