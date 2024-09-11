import { Request } from 'express';
export class OperadorRequestModel extends Request {
  user: {
    id: string;
    nome: string;
    criado_em: string;
  };
}
