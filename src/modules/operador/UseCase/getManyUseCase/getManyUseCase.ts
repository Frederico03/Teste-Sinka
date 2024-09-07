import { Injectable } from '@nestjs/common';
import { OperadorRepository } from '../../repositories/operadorRepository';

interface GetManyOperadorRequest {
  pagina: string;
}

@Injectable()
export class GetManyOperadorUseCase {
  constructor(private operadorRepository: OperadorRepository) {}

  async execute({ pagina }: GetManyOperadorRequest) {
    const PAGINA_DEFAULT = 1;
    const PAGICANACAO_DEFAULT = 10;

    const paginaAtual = Number(pagina) || PAGINA_DEFAULT;
    const paginacaoAtual = PAGICANACAO_DEFAULT;

    const operadores = await this.operadorRepository.findMany(
      paginaAtual,
      paginacaoAtual,
    );
    return operadores;
  }
}
