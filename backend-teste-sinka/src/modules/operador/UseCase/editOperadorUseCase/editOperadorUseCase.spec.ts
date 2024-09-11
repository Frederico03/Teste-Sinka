import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';
import { makeOperador } from '../../factories/operadorFactory';
import { OperadorRepositoryinMemory } from '../../repositories/operadorRepositoryinMemory';
import { EditOperadorUseCase } from './editOperadorUseCase';

let operadorRepositoryInMemory: OperadorRepositoryinMemory;
let editOperadorUseCase: EditOperadorUseCase;

describe('Edit Operador', () => {
  beforeEach(() => {
    operadorRepositoryInMemory = new OperadorRepositoryinMemory();
    editOperadorUseCase = new EditOperadorUseCase(operadorRepositoryInMemory);
  });

  it('Should be able to edit operador', async () => {
    const operador = makeOperador({
      id: 'fake id',
    });

    operadorRepositoryInMemory.operadores = [operador];

    const novoNome = 'Operador y';

    await editOperadorUseCase.execute({
      novoNome: novoNome,
      operadorId: operador.id,
    });

    expect(operadorRepositoryInMemory.operadores[0].nome).toEqual(novoNome);
  });

  it('Should be able to throw error when not found operador', async () => {
    expect(async () => {
      await editOperadorUseCase.execute({
        operadorId: 'fakeId',
        novoNome: 'Operador z',
      });
    }).rejects.toThrow(OperadorNotFoundException);
  });
});
