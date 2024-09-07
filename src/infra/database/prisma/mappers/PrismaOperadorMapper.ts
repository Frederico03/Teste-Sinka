import { Operador as OperadorRaw } from '@prisma/client';
import { Operador } from './../../../../modules/operador/entities/Operador';

export class PrismaOperadorMapper {
  static toPrisma({
    nome,
    id,
    criado_em,
    atualizado_em,
  }: Operador): OperadorRaw {
    return { nome, id, criado_em, atualizado_em };
  }

  static toDomain({
    nome,
    id,
    criado_em,
    atualizado_em,
  }: OperadorRaw): Operador {
    return new Operador({ nome, criado_em, atualizado_em }, id);
  }
}
