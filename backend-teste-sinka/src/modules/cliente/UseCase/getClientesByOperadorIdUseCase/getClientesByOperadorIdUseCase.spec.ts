import { GetClientesByOperadorIdUseCase } from './getClientesByOperadorIdUseCase';
import { ClienteRepositoryinMemory } from '../../repositories/clienteRepositoryinMemory';
import { SortData } from '../../../services/sortData/sortData';
import { makeCliente } from '../../factories/makeClientes';

let getClientesByOperadorIdUseCase: GetClientesByOperadorIdUseCase;
let clienteRepositoryinMemory: ClienteRepositoryinMemory;
let sortData: SortData;

describe('GetClientesByOperadorIdUseCase', () => {
  beforeEach(() => {
    clienteRepositoryinMemory = new ClienteRepositoryinMemory();
    sortData = {
      sortClienteByCreate: jest.fn(),
    } as any as SortData;

    getClientesByOperadorIdUseCase = new GetClientesByOperadorIdUseCase(
      clienteRepositoryinMemory,
      sortData,
    );
  });

  it('Deve retornar uma lista de clientes', async () => {
    const operadorId = 'operador1';
    const clientes = [...new Array(3)].map(() =>
      makeCliente({ operadorId: 'operador1' }),
    );
    clienteRepositoryinMemory.clientes = clientes;
    (sortData.sortClienteByCreate as jest.Mock).mockResolvedValue(clientes);
    const result = await getClientesByOperadorIdUseCase.execute({ operadorId });

    expect(result).toBe(clientes);
  });
});
