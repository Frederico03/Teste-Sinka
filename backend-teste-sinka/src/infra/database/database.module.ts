import { PrismaOperadorRepository } from './prisma/repositories/PrismaOperadorRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OperadorRepository } from '../../modules/operador/repositories/operadorRepository';
import { ClienteRepository } from 'src/modules/cliente/repositories/clienteRepository';
import { PrismaClienteRepository } from './prisma/repositories/PrismaClienteRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: OperadorRepository,
      useClass: PrismaOperadorRepository,
    },
    {
      provide: ClienteRepository,
      useClass: PrismaClienteRepository,
    },
  ],
  exports: [OperadorRepository, ClienteRepository],
})
export class DataBaseModule {}
