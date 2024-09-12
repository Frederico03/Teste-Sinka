import { EditClientesUseCase } from './editClientesUseCase';
import { ClienteRepositoryinMemory } from '../../repositories/clienteRepositoryinMemory';
import { makeCliente } from '../../factories/makeClientes';
import { AssociateClienteOperador } from '../../../services/associateClienteOperador/associateClienteOperador';

let editClientesUseCase: EditClientesUseCase;
let clienteRepositoryinMemory: ClienteRepositoryinMemory;
let associateClienteOperador: AssociateClienteOperador;

describe('EditClientesUseCase', () => {
  beforeEach(() => {
    associateClienteOperador = {
      setEditClientes: jest.fn(),
    } as any as AssociateClienteOperador;

    clienteRepositoryinMemory = new ClienteRepositoryinMemory();
    editClientesUseCase = new EditClientesUseCase(
      associateClienteOperador,
      clienteRepositoryinMemory,
    );
  });

  it('Deve chamar setEditClientes', async () => {
    clienteRepositoryinMemory.clientes = [...new Array(2)].map(() =>
      makeCliente({}),
    );

    (associateClienteOperador.setEditClientes as jest.Mock).mockResolvedValue(
      undefined,
    );

    const operadorId = 'operador1';
    const result = await editClientesUseCase.execute(operadorId);

    expect(result).toBe(true);
    expect(associateClienteOperador.setEditClientes).toHaveBeenCalledWith(
      operadorId,
    );
  });

  it('Deve chamar setEditClientes com undefined', async () => {
    clienteRepositoryinMemory.clientes = [...new Array(2)].map(() =>
      makeCliente({}),
    );

    (associateClienteOperador.setEditClientes as jest.Mock).mockResolvedValue(
      undefined,
    );

    const result = await editClientesUseCase.execute();

    expect(result).toBe(true);
    expect(associateClienteOperador.setEditClientes).toHaveBeenCalledWith(
      undefined,
    );
  });

  it('Deve retornar false quando ocorrer um erro', async () => {
    clienteRepositoryinMemory.clientes = [...new Array(2)].map(() =>
      makeCliente({}),
    );
    jest
      .spyOn(associateClienteOperador, 'setEditClientes')
      .mockRejectedValue(new Error('Association error'));

    const result = await editClientesUseCase.execute('operador1');

    expect(result).toBe(false);
  });
});
