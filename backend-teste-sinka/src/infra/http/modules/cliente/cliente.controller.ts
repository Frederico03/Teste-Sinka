import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase/createClienteUseCase';
import { GetClientesByOperadorIdUseCase } from 'src/modules/cliente/UseCase/getClientesByOperadorIdUseCase/getClientesByOperadorIdUseCase';
import { ParseFileToCliente } from 'src/modules/services/parseClienteToFile/parseClienteToFile';

@Controller('cliente')
export class ClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase,
    private getClientesByOperadorIdUseCase: GetClientesByOperadorIdUseCase,
    private parseFileToCliente: ParseFileToCliente,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCliente(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    await this.createClienteUseCase.execute(file);
    return true;
  }

  @Get(':id')
  async getManyClientesByOperadorId(@Param('id') id: string) {
    const clientes = await this.getClientesByOperadorIdUseCase.execute({
      operadorId: id,
    });
    return clientes;
  }

  @Get()
  async getManyClientes(@Res() res: Response) {
    const csv = await this.parseFileToCliente.generateCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csv);
    return csv;
  }
}
