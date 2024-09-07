import { Injectable } from '@nestjs/common';
import { OperadorRepository } from '../../repositories/operadorRepository';
import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';

interface EditOperadorRequest {
  operadorId: string;
  novoNome: string;
}

@Injectable()
export class EditOperadorUseCase {
  constructor(private operadorRepository: OperadorRepository) {}

  async execute({ operadorId, novoNome }: EditOperadorRequest) {
    const operador = await this.operadorRepository.findById(operadorId);

    if (!operador) throw new OperadorNotFoundException();

    operador.nome = novoNome;
    operador.atualizado_em = new Date();

    await this.operadorRepository.save(operador);

    return operador;
  }
}
