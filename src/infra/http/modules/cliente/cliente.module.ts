import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { DataBaseModule } from 'src/infra/database/database.module';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase/createClienteUseCase';
import { FileToCliente } from 'src/modules/services/parseFileToCliente/fileToCliente';
import { OperadorSort } from 'src/modules/services/operadorSort/operadorSort';

@Module({
  imports: [DataBaseModule],
  controllers: [ClienteController],
  providers: [CreateClienteUseCase, FileToCliente, OperadorSort],
})
export class ClienteModule {}
