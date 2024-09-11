import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface ClienteSchema {
  nome: string;
  email: string;
  valor: number;
  data_nascimento: Date;
  criado_em: Date;
  atualizado_em: Date;
  operadorId: string;
}

export class Cliente {
  private props: ClienteSchema;
  private _id: string;

  constructor(
    props: Replace<ClienteSchema, { criado_em?: Date; atualizado_em?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      criado_em: props.criado_em || new Date(),
      atualizado_em: new Date(),
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

  get email(): string {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }

  get valor(): number {
    return this.props.valor;
  }
  set valor(valor: number) {
    this.props.valor = valor;
  }

  get data_nascimento(): Date {
    return this.props.data_nascimento;
  }
  set data_nascimento(data_nascimento: Date) {
    this.props.data_nascimento = data_nascimento;
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

  get operadorId(): string {
    return this.props.operadorId;
  }
  set operadorId(operadorId: string) {
    this.props.operadorId = operadorId;
  }
}
