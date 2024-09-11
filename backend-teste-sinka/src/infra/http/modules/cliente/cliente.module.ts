import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { DataBaseModule } from 'src/infra/database/database.module';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase/createClienteUseCase';
import { FileToCliente } from 'src/modules/services/parseFileToCliente/fileToCliente';
import { SortData } from 'src/modules/services/sortData/sortData';
import { GetClientesByOperadorIdUseCase } from 'src/modules/cliente/UseCase/getClientesByOperadorIdUseCase/getClientesByOperadorIdUseCase';
import { ParseFileToCliente } from 'src/modules/services/parseClienteToFile/parseClienteToFile';

@Module({
  imports: [DataBaseModule],
  controllers: [ClienteController],
  providers: [
    CreateClienteUseCase,
    FileToCliente,
    SortData,
    GetClientesByOperadorIdUseCase,
    ParseFileToCliente,
  ],
})
export class ClienteModule {}
