import { Cliente as ClienteRaw } from '@prisma/client';
import { Cliente } from 'src/modules/cliente/entities/Cliente';

export class PrismaClienteMapper {
  static toPrisma({
    nome,
    email,
    valor,
    data_nascimento,
    id,
    criado_em,
    atualizado_em,
    operadorId,
  }: Cliente): ClienteRaw {
    return {
      nome,
      email,
      valor,
      data_nascimento,
      criado_em,
      atualizado_em,
      id,
      operadorId: operadorId ?? '',
    };
  }
}
