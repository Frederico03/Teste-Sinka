import { Cliente } from '../entities/Cliente';

export abstract class ClienteRepository {
  abstract create(cliente: Cliente): Promise<void>;
  abstract findAll(): Promise<Cliente[] | undefined>;
  abstract save(cliente: Cliente): Promise<void>;
  abstract findManyById(id: string): Promise<Cliente[]>;
  abstract findById(id: string): Promise<Cliente | null>;
  abstract deleteMany(): Promise<void>;
}
