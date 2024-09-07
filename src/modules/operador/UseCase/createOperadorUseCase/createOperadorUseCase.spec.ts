import { OperadorRepositoryinMemory } from '../../repositories/operadorRepositoryinMemory';
import { CreateOperadorUseCase } from './createOperadorUseCase';

let createOperadorUseCase: CreateOperadorUseCase;
let operadorRepositoryinMemory: OperadorRepositoryinMemory;

describe('Create Operador', () => {
  beforeEach(() => {
    operadorRepositoryinMemory = new OperadorRepositoryinMemory();
    createOperadorUseCase = new CreateOperadorUseCase(
      operadorRepositoryinMemory,
    );
  });

  it('Shoud be able to create operador', async () => {
    expect(operadorRepositoryinMemory.operadores).toEqual([]);

    const operador = await createOperadorUseCase.execute({
      nome: 'Frederico Garcez',
    });

    expect(operadorRepositoryinMemory.operadores).toEqual([operador]);
  });
});
