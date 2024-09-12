import { Cliente } from '../entities/Cliente';
import { ClienteRepository } from './clienteRepository';

export class ClienteRepositoryinMemory implements ClienteRepository {
  public clientes: Cliente[] = [];

  async create(cliente: Cliente): Promise<void> {
    this.clientes.push(cliente);
  }
  async findAll(): Promise<Cliente[] | undefined> {
    return this.clientes;
  }
  async save(cliente: Cliente): Promise<void> {
    throw new Error('Method not implemented.' + cliente);
  }

  async findManyById(id: string): Promise<Cliente[]> {
    return this.clientes.filter((cliente) => cliente.id === id);
  }

  async findById(id: string): Promise<Cliente | null> {
    const cliente = this.clientes.find((cliente) => cliente.id === id);

    if (!cliente) return null;

    return cliente;
  }
  async deleteMany(): Promise<void> {}
}
