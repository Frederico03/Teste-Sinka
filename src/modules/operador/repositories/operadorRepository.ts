import { Operador } from '../entities/Operador';

export abstract class OperadorRepository {
  abstract create(operador: Operador): Promise<void>;
  abstract findById(id: string): Promise<Operador | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(operador: Operador): Promise<void>;
  abstract findMany(pagina: number, paginacao: number): Promise<Operador[]>;
  abstract findAll(): Promise<Operador[]>;
  abstract countClientesByOperador(): any;
}
