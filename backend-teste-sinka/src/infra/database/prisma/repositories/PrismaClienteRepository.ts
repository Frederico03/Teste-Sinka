import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/modules/cliente/entities/Cliente';
import { PrismaService } from '../prisma.service';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { PrismaClienteMapper } from '../mappers/PrismaClienteMapper';

@Injectable()
export class PrismaClienteRepository implements ClienteRepository {
  constructor(private prisma: PrismaService) {}

  async findManyById(id: string): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany({
      where: {
        operadorId: id,
      },
    });
    return clientes.map(PrismaClienteMapper.toDomain);
  }

  async create(cliente: Cliente): Promise<void> {
    const clienteRaw = PrismaClienteMapper.toPrisma(cliente);

    await this.prisma.cliente.create({
      data: clienteRaw,
    });
  }

  async save(cliente: Cliente): Promise<void> {
    const clienteRaw = PrismaClienteMapper.toPrisma(cliente);

    await this.prisma.cliente.update({
      data: clienteRaw,
      where: {
        id: clienteRaw.id,
      },
    });
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany();
    return clientes.map(PrismaClienteMapper.toDomain);
  }
}
