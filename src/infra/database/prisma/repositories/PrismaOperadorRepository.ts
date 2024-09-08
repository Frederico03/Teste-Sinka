import { Injectable } from '@nestjs/common';
import { Operador } from '../../../../modules/operador/entities/Operador';
import { PrismaOperadorMapper } from '../mappers/PrismaOperadorMapper';
import { PrismaService } from '../prisma.service';
import { OperadorRepository } from '../../../../modules/operador/repositories/operadorRepository';

@Injectable()
export class PrismaOperadorRepository implements OperadorRepository {
  constructor(private prisma: PrismaService) {}

  async create(operador: Operador): Promise<void> {
    const operadorRaw = PrismaOperadorMapper.toPrisma(operador);

    await this.prisma.operador.create({
      data: operadorRaw,
    });
  }

  async findById(id: string): Promise<Operador | null> {
    const operador = await this.prisma.operador.findUnique({
      where: {
        id,
      },
    });

    if (!operador) return null;

    return PrismaOperadorMapper.toDomain(operador);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.operador.delete({
      where: {
        id,
      },
    });
  }

  async save(operador: Operador): Promise<void> {
    const operadorRaw = PrismaOperadorMapper.toPrisma(operador);

    await this.prisma.operador.update({
      data: operadorRaw,
      where: {
        id: operadorRaw.id,
      },
    });
  }

  async findMany(pagina: number, paginacao: number): Promise<Operador[]> {
    const operadores = await this.prisma.operador.findMany({
      take: paginacao,
      skip: (pagina - 1) * paginacao,
    });

    return operadores.map(PrismaOperadorMapper.toDomain);
  }

  async findAll(): Promise<Operador[]> {
    const operadores = await this.prisma.operador.findMany();
    console.log(operadores);
    return operadores.map(PrismaOperadorMapper.toDomain);
  }

  async countClientesByOperador() {
    const operadores = await this.prisma.operador.findMany({
      include: {
        _count: {
          select: { clientes: true },
        },
      },
    });

    return operadores.map((op) => ({
      operadorId: op.id,
      nome: op.nome,
      count: op._count.clientes,
    }));
  }
}
