import { OperadorNotFoundException } from '../../exceptions/OperadorNotFoundException';
import { makeOperador } from '../../factories/operadorFactory';
import { OperadorRepositoryinMemory } from '../../repositories/operadorRepositoryinMemory';
import { DeleteOperadorUseCase } from './deleteOperadorUseCase';

let deleteOperadorUseCase: DeleteOperadorUseCase;
let operadorRepositoryinMemory: OperadorRepositoryinMemory;

describe('Delete Operador', () => {
  beforeEach(() => {
    operadorRepositoryinMemory = new OperadorRepositoryinMemory();
    deleteOperadorUseCase = new DeleteOperadorUseCase(
      operadorRepositoryinMemory,
    );
  });

  it('Shoud be able to delete operador', async () => {
    const operador = makeOperador({});
    operadorRepositoryinMemory.operadores = [operador];

    await deleteOperadorUseCase.execute({
      operadorId: operador.id,
    });

    expect(operadorRepositoryinMemory.operadores).toHaveLength(0);
  });

  it('Should be able to throw error when not found operador', async () => {
    expect(async () => {
      await deleteOperadorUseCase.execute({
        operadorId: 'fakeId',
      });
    }).rejects.toThrow(OperadorNotFoundException);
  });
});
