import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface OperadorSchema {
  nome: string;
  criado_em: Date;
  atualizado_em: Date;
}

export class Operador {
  private props: OperadorSchema;
  private _id: string;

  constructor(
    props: Replace<OperadorSchema, { criado_em?: Date; atualizado_em?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      criado_em: props.criado_em || new Date(),
      atualizado_em: props.atualizado_em || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this.props.nome;
  }
  set nome(nome: string) {
    this.props.nome = nome;
  }

  get criado_em(): Date {
    return this.props.criado_em;
  }
  set criado_em(criado_em: Date) {
    this.props.criado_em = criado_em;
  }

  get atualizado_em(): Date {
    return this.props.atualizado_em;
  }
  set atualizado_em(atualizado_em: Date) {
    this.props.atualizado_em = atualizado_em;
  }
}
