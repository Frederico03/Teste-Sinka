import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { Injectable } from '@nestjs/common';
import { stringify } from 'csv-stringify';
import * as moment from 'moment';

@Injectable()
export class ParseFileToCliente {
  constructor(private clienteRepository: ClienteRepository) {}

  async generateCsv(): Promise<string> {
    const users = (await this.clienteRepository.findAll()) || [];

    const formattedUsers = users.map((user) => ({
      nome: user.nome,
      dataNascimento: moment(user.data_nascimento).format('DD/MM/YYYY'),
      valor: user.valor.toFixed(2),
      email: user.email,
    }));

    return new Promise((resolve, reject) => {
      stringify(formattedUsers, { header: true }, (err, output) => {
        if (err) {
          return reject('Erro ao gerar o CSV');
        }
        resolve(output);
      });
    });
  }
}
