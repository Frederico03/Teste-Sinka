import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException';

export class ClienteNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Cliente não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
