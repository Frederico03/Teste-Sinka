import { GetManyOperadorUseCase } from './getManyUseCase';
import { OperadorRepositoryinMemory } from '../../repositories/operadorRepositoryinMemory';
import { makeOperador } from '../../factories/operadorFactory';
import { Operador } from '../../entities/operador';

let operadorRepositoryinMemory: OperadorRepositoryinMemory;
let getManyOperadorUseCase: GetManyOperadorUseCase;

describe('Get many Operador', () => {
  beforeEach(() => {
    operadorRepositoryinMemory = new OperadorRepositoryinMemory();
    getManyOperadorUseCase = new GetManyOperadorUseCase(
      operadorRepositoryinMemory,
    );
  });

  it('Should be able to get many operador', async () => {
    const testeOperadores = [...new Array(10)].map(() => makeOperador({}));

    operadorRepositoryinMemory.operadores = testeOperadores;

    const result = await getManyOperadorUseCase.execute({ pagina: '1' });

    expect(result).toEqual(testeOperadores);
  });

  it('Should be able to control operadores per page', async () => {
    const testeOperadores = [...new Array(10)].map(() => makeOperador({}));

    operadorRepositoryinMemory.operadores = testeOperadores;

    const result = await getManyOperadorUseCase.execute({ pagina: '1' });

    expect(result).toHaveLength(10);
  });

  it('Should be able to control operador page', async () => {
    const testeOperadores = [...new Array(20)].map((_, index) =>
      makeOperador({ nome: index < 10 ? 'page 1' : 'page 2' }),
    );

    operadorRepositoryinMemory.operadores = testeOperadores;

    let result: Operador[];

    result = await getManyOperadorUseCase.execute({
      pagina: '2',
    });
    expect(result[0].nome).toEqual('page 2');

    result = await getManyOperadorUseCase.execute({
      pagina: '1',
    });

    expect(result[0].nome).toEqual('page 1');
  });
});
