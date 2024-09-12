import { Cliente } from '../entities/Cliente';

type Override = Partial<Cliente>;

export const makeCliente = ({ id, ...override }: Override) => {
  return new Cliente(
    {
      nome: 'string',
      email: 'string',
      valor: 1,
      data_nascimento: new Date(),
      operadorId: 'string',
      ...override,
    },
    id,
  );
};
