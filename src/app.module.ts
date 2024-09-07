import { DataBaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { OperadorModule } from './infra/http/modules/operador/operador.module';
import { ClienteModule } from './infra/http/modules/cliente/cliente.module';

@Module({
  imports: [OperadorModule, ClienteModule, DataBaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
