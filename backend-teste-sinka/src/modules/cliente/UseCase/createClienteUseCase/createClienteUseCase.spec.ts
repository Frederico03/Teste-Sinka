import { OperadorNotFoundException } from '../../../operador/exceptions/OperadorNotFoundException';
import { ClienteRepositoryinMemory } from '../../repositories/clienteRepositoryinMemory';
import { CreateClienteUseCase } from './createClienteUseCase';
import { OperadorRepositoryinMemory } from '../../../operador/repositories/operadorRepositoryinMemory';
import { FileToCliente } from '../../../services/parseFileToCliente/fileToCliente';
import { makeOperador } from '../../../operador/factories/operadorFactory';
import { makeCliente } from '../../factories/makeClientes';

let createClienteUseCase: CreateClienteUseCase;
let clienteRepositoryinMemory: ClienteRepositoryinMemory;
let operadorRepositoryinMemory: OperadorRepositoryinMemory;
let fileToCliente: FileToCliente;

describe('Criar Cliente', () => {
  beforeEach(() => {
    fileToCliente = {
      parseFileToCliente: jest.fn(),
    } as any as FileToCliente;

    operadorRepositoryinMemory = new OperadorRepositoryinMemory();
    clienteRepositoryinMemory = new ClienteRepositoryinMemory();
    createClienteUseCase = new CreateClienteUseCase(
      operadorRepositoryinMemory,
      clienteRepositoryinMemory,
      fileToCliente,
    );
  });

  it('Não existe operadores', async () => {
    expect(clienteRepositoryinMemory.clientes).toEqual([]);
    const fileMock = {} as Express.Multer.File;

    expect(
      async () => await createClienteUseCase.execute(fileMock),
    ).rejects.toThrow(OperadorNotFoundException);
  });

  it('Não cria operadores', async () => {
    const fileMock = {} as Express.Multer.File;
    const testeOperadores = [...new Array(2)].map(() => makeOperador({}));
    operadorRepositoryinMemory.operadores = testeOperadores;
    expect(
      async () => await createClienteUseCase.execute(fileMock),
    ).rejects.toThrow(Error);
  });

  it('Cria operadores', async () => {
    const fileMock = {} as Express.Multer.File;

    const testeOperadores = [...new Array(2)].map(() => makeOperador({}));
    operadorRepositoryinMemory.operadores = testeOperadores;

    const testeClientes = [...new Array(2)].map(() => makeCliente({}));
    (fileToCliente.parseFileToCliente as jest.Mock).mockResolvedValue(
      testeClientes,
    );

    const result = await createClienteUseCase.execute(fileMock);
    expect(result).toBe(true);
  });
});
