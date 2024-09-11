import { Injectable } from '@nestjs/common';
import { OperadorRepository } from '../../repositories/operadorRepository';
import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';

interface DeleteOperadorRequest {
  operadorId: string;
}

@Injectable()
export class DeleteOperadorUseCase {
  constructor(private operadorRepository: OperadorRepository) {}

  async execute({ operadorId }: DeleteOperadorRequest) {
    const operador = await this.operadorRepository.findById(operadorId);

    if (!operador) throw new OperadorNotFoundException();

    await this.operadorRepository.delete(operadorId);
  }
}
