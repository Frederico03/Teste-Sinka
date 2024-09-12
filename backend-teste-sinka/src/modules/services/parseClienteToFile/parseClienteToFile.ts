import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { Injectable } from '@nestjs/common';
import { stringify } from 'csv-stringify';
import * as moment from 'moment';
import { ClienteNotFoundException } from 'src/modules/cliente/exceptions/clienteNotFoundException';

@Injectable()
export class ParseFileToCliente {
  constructor(private clienteRepository: ClienteRepository) {}

  async generateCsv(): Promise<string> {
    const clientes = (await this.clienteRepository.findAll()) || [];

    if (clientes.length == 0) throw new ClienteNotFoundException();

    const clientesFormatados = clientes.map((user) => ({
      nome: user.nome,
      dataNascimento: moment(user.data_nascimento).format('DD/MM/YYYY'),
      valor: user.valor.toFixed(2),
      email: user.email,
    }));

    return new Promise((resolve, reject) => {
      stringify(clientesFormatados, { header: true }, (err, output) => {
        if (err) {
          return reject('Erro ao gerar o CSV');
        }
        resolve(output);
      });
    });
  }
}
