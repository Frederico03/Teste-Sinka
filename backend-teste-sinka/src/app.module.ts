import { DataBaseModule } from './infra/database/database.module';
import { Module } from '@nestjs/common';
import { OperadorModule } from './infra/http/modules/operador/operador.module';
import { ClienteModule } from './infra/http/modules/cliente/cliente.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OperadorModule,
    ClienteModule,
    DataBaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
