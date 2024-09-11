import { OperadorRepositoryinMemory } from '../../repositories/operadorRepositoryinMemory';
import { makeOperador } from '../../factories/operadorFactory';
import { GetOperadorUseCase } from './getOperadorUseCase';
import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';

let operadorRepositoryInMemory: OperadorRepositoryinMemory;
let getOperadorUseCase: GetOperadorUseCase;

describe('Get Operador', () => {
  beforeEach(() => {
    operadorRepositoryInMemory = new OperadorRepositoryinMemory();
    getOperadorUseCase = new GetOperadorUseCase(operadorRepositoryInMemory);
  });

  it('Should be able to get operador', async () => {
    const operador = makeOperador({ id: 'fake ID' });

    operadorRepositoryInMemory.operadores = [operador];

    const result = await getOperadorUseCase.execute({
      operadorId: operador.id,
    });

    expect(result).toEqual(operador);
  });

  it('Should be able to throw error when not found operador', async () => {
    expect(async () => {
      await getOperadorUseCase.execute({
        operadorId: 'fakeId',
      });
    }).rejects.toThrow(OperadorNotFoundException);
  });
});
