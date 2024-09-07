import { Operador } from '../entities/Operador';

type Override = Partial<Operador>;

export const makeOperador = ({ id, ...override }: Override) => {
  return new Operador(
    {
      nome: 'Operador x',
      ...override,
    },
    id,
  );
};
