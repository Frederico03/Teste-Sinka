import { Injectable } from '@nestjs/common';
import { OperadorRepository } from '../../repositories/operadorRepository';
import { Operador } from '../../entities/Operador';

interface CreateOperadorRequest {
  nome: string;
}

@Injectable()
export class CreateOperadorUseCase {
  constructor(private operadorRepository: OperadorRepository) {}

  async execute({ nome }: CreateOperadorRequest) {
    const operador = new Operador({ nome });
    await this.operadorRepository.create(operador);
    return operador;
  }
}
