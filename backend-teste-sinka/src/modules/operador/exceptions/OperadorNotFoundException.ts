import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException';

export class OperadorNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Operador não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
