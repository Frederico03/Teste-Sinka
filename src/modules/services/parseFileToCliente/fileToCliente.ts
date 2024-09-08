import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import { Cliente } from 'src/modules/cliente/entities/Cliente';
import { OperadorSort } from '../operadorSort/operadorSort';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileToCliente {
  constructor(private operadorSort: OperadorSort) {}

  async parseFileToCliente(file: Express.Multer.File): Promise<Cliente[]> {
    const { buffer } = file;
    const readableFile = Readable.from(buffer);
    const clientes: Cliente[] = [];
    const operadores = await this.operadorSort.sortOperadores();
    let index = 0;

    return new Promise((resolve, reject) => {
      readableFile
        .pipe(csvParser({ headers: false }))
        .on('data', (row) => {
          try {
            const nome = row[0];
            const data_nascimento = row[1].trim();
            const valor = row[2].trim();
            const email = row[3].trim();

            const dataNascimento = this.stringToDate(data_nascimento);
            const cliente = new Cliente({
              nome,
              data_nascimento: dataNascimento,
              valor: parseFloat(valor),
              email,
              operadorId: operadores[index].operadorId,
            });
            clientes.push(cliente);
            index = (index + 1) % operadores.length;
          } catch (error) {
            console.error('Error processing row:', row, error);
          }
        })
        .on('end', () => resolve(clientes))
        .on('error', reject);
    });
  }

  stringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
