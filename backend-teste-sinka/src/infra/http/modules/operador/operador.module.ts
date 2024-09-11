import { SortData } from 'src/modules/services/sortData/sortData';
import { Module } from '@nestjs/common';
import { OperadorController } from './operador.controller';
import { CreateOperadorUseCase } from 'src/modules/operador/UseCase/createOperadorUseCase/createOperadorUseCase';
import { DataBaseModule } from 'src/infra/database/database.module';
import { EditOperadorUseCase } from 'src/modules/operador/UseCase/editOperadorUseCase/editOperadorUseCase';
import { DeleteOperadorUseCase } from 'src/modules/operador/UseCase/deleteOperadorUseCase/deleteOperadorUseCase';
import { GetManyOperadorUseCase } from 'src/modules/operador/UseCase/getManyUseCase/getManyUseCase';
import { GetOperadorUseCase } from 'src/modules/operador/UseCase/getOperadorUseCase/getOperadorUseCase';
import { EditClientesUseCase } from 'src/modules/cliente/UseCase/editClientesUseCase/editClientesUseCase';
import { AssociateClienteOperador } from 'src/modules/services/associateClienteOperador/associateClienteOperador';

@Module({
  imports: [DataBaseModule],
  controllers: [OperadorController],
  providers: [
    CreateOperadorUseCase,
    EditOperadorUseCase,
    DeleteOperadorUseCase,
    GetManyOperadorUseCase,
    GetOperadorUseCase,
    EditClientesUseCase,
    AssociateClienteOperador,
    SortData,
  ],
})
export class OperadorModule {}
