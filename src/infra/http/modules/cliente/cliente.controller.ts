import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase/createClienteUseCase';

@Controller('cliente')
export class ClienteController {
  constructor(private createClienteUseCase: CreateClienteUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCliente(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    await this.createClienteUseCase.execute(file);
    return true;
  }
}
