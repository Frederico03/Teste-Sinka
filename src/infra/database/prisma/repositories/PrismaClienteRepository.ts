import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/modules/cliente/entities/Cliente';
import { PrismaService } from '../prisma.service';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { PrismaClienteMapper } from '../mappers/PrismaClienteMapper';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}
  async create(cliente: Cliente): Promise<void> {
    const clienteRaw = PrismaClienteMapper.toPrisma(cliente);

    await this.prisma.cliente.create({
      data: clienteRaw,
    });
  }
}
