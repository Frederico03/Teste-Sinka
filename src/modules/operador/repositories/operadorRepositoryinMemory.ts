import { Operador } from '../entities/Operador';
import { OperadorRepository } from './operadorRepository';

export class OperadorRepositoryinMemory implements OperadorRepository {
  public operadores: Operador[] = [];

  countClientesByOperador() {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Operador[]> {
    return this.operadores;
  }

  async create(operador: Operador): Promise<void> {
    this.operadores.push(operador);
  }

  async findById(id: string): Promise<Operador | null> {
    const operador = this.operadores.find((operador) => operador.id === id);

    if (!operador) return null;

    return operador;
  }

  async delete(id: string): Promise<void> {
    this.operadores = this.operadores.filter((operador) => operador.id !== id);
  }

  async save(operador: Operador): Promise<void> {
    const operadorIndex = this.operadores.findIndex(
      (currentOperador) => currentOperador.id === operador.id,
    );

    if (operadorIndex >= 0) this.operadores[operadorIndex] = operador;
  }

  async findMany(pagina: number, paginacao: number): Promise<Operador[]> {
    return this.operadores.slice((pagina - 1) * paginacao, pagina * paginacao);
  }
}
