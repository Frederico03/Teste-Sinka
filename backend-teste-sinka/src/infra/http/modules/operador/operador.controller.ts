import { GetManyOperadorUseCase } from './../../../../modules/operador/UseCase/getManyUseCase/getManyUseCase';
import { GetOperadorUseCase } from './../../../../modules/operador/UseCase/getOperadorUseCase/getOperadorUseCase';
import { DeleteOperadorUseCase } from './../../../../modules/operador/UseCase/deleteOperadorUseCase/deleteOperadorUseCase';
import { EditOperadorUseCase } from './../../../../modules/operador/UseCase/editOperadorUseCase/editOperadorUseCase';
import { CreateOperadorUseCase } from './../../../../modules/operador/UseCase/createOperadorUseCase/createOperadorUseCase';
import {
  Controller,
  Body,
  Post,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { OperadorBody } from './dtos/operatorBody';
import { EditClientesUseCase } from 'src/modules/cliente/UseCase/editClientesUseCase/editClientesUseCase';

@Controller('operadores')
export class OperadorController {
  constructor(
    private createOperadorUseCase: CreateOperadorUseCase,
    private editOperadorUseCase: EditOperadorUseCase,
    private deleteOperadorUseCase: DeleteOperadorUseCase,
    private getOperadorUseCase: GetOperadorUseCase,
    private getManyOperadorUseCase: GetManyOperadorUseCase,
    private editClientesUseCase: EditClientesUseCase,
  ) {}

  @Post()
  async createPost(@Body() body: OperadorBody) {
    const { nome } = body;
    const operador = await this.createOperadorUseCase.execute({
      nome,
    });
    await this.editClientesUseCase.execute();
    return operador;
  }

  @Put(':id')
  async editOperador(
    @Param('id') operadorId: string,
    @Body() body: OperadorBody,
  ) {
    const { nome } = body;
    await this.editOperadorUseCase.execute({
      novoNome: nome,
      operadorId: operadorId,
    });
  }

  @Delete(':id')
  async deleteOperador(@Param('id') operadorId: string) {
    await this.editClientesUseCase.execute(operadorId);
    await this.deleteOperadorUseCase.execute({
      operadorId: operadorId,
    });
  }

  @Get(':id')
  async getOperador(@Param('id') operadorId: string) {
    const operador = await this.getOperadorUseCase.execute({
      operadorId: operadorId,
    });

    return operador;
  }

  @Get()
  async getManyOperador() {
    const operador = await this.getManyOperadorUseCase.execute();
    return operador;
  }
}
