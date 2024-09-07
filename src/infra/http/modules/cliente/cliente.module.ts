import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { DataBaseModule } from 'src/infra/database/database.module';
import { CreateClienteUseCase } from 'src/modules/cliente/UseCase/createClienteUseCase';

@Module({
  imports: [DataBaseModule],
  controllers: [ClienteController],
  providers: [CreateClienteUseCase],
})
export class ClienteModule {}
