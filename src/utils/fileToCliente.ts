import { Readable } from 'stream';
import * as readline from 'readline';
import { Cliente } from 'src/modules/cliente/entities/Cliente';

export const fileToCliente = async (
  file: Express.Multer.File,
): Promise<Cliente[]> => {
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const clienteLines = readline.createInterface({
    input: readableFile,
  });

  const clientes: Cliente[] = [];

  for await (const line of clienteLines) {
    const productLineSplit = line.split(', ');
    const data_nascimento = stringToDate(productLineSplit[1]);
    const cliente = new Cliente({
      nome: productLineSplit[0],
      data_nascimento: data_nascimento,
      valor: parseFloat(productLineSplit[2]),
      email: productLineSplit[3],
      operadorId: '40dc840e-20ce-4691-a83a-eb9d7a93c7f2',
    });

    clientes.push(cliente);
  }

  return clientes;
};

const stringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Subtrai 1 do mês porque em JavaScript os meses são indexados de 0 (jan = 0, dez = 11)
};
