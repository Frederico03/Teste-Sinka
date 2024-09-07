import { Cliente } from '../entities/Cliente';

export abstract class ClienteRepository {
  abstract create(cliente: Cliente): Promise<void>;
}
