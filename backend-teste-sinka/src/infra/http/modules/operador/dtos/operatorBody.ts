import { IsNotEmpty, IsString } from 'class-validator';

export class OperadorBody {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
