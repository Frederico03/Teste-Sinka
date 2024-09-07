import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase';

@Controller('cliente')
export class ClienteController {
  constructor(private createClienteUseCase: CreateClienteUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCliente(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.createClienteUseCase.execute(file);
  }
}
