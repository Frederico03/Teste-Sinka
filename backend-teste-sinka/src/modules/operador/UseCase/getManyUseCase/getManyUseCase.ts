import { Injectable } from '@nestjs/common';
import { SortData } from 'src/modules/services/sortData/sortData';

@Injectable()
export class GetManyOperadorUseCase {
  constructor(private sortData: SortData) {}

  async execute() {
    const operadores = await this.sortData.sortOperadoresByCreate();
    return operadores;
  }
}
