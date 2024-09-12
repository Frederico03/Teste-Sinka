import { Injectable } from '@nestjs/common';
import { ClienteRepository } from '../../repositories/clienteRepository';

@Injectable()
export class DeleteClienteUseCase {
  constructor(private clienteRepository: ClienteRepository) {}

  async execute() {
    await this.clienteRepository.deleteMany();
  }
}
