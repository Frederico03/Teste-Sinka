import { Injectable } from '@nestjs/common';
import { OperadorRepository } from '../../repositories/operadorRepository';
import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';

interface GetOperadorRequest {
  operadorId: string;
}

@Injectable()
export class GetOperadorUseCase {
  constructor(private operadorRepository: OperadorRepository) {}

  async execute({ operadorId }: GetOperadorRequest) {
    const operador = await this.operadorRepository.findById(operadorId);

    if (!operador) throw new OperadorNotFoundException();

    return operador;
  }
}
