import {MicraError} from '../classes/MicraError';

export class ValidationError<Fields extends string = string>
  extends MicraError
  implements Micra.ValidationError<Fields>
{
  protected _messages: Micra.ValidationErrorExtras<Fields>[] = [];

  statusCode: 422 = 422;

  constructor(message = 'Validation Error') {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  hasAny(): boolean {
    return this._messages.length > 0;
  }

  has(field: Fields): boolean {
    return this._messages.some((message) => message.field === field);
  }

  get<Field extends Fields>(
    field: Field,
  ): Micra.ValidationErrorExtras<Field>[] {
    return (this._messages.filter((message) => message.field === field) ??
      []) as Micra.ValidationErrorExtras<Field>[];
  }

  set<Field extends Fields>(
    field: Field,
    extras: Omit<Micra.ValidationErrorExtras<Field>, 'field'>,
  ): this {
    this._messages.push({
      ...extras,
      field,
    });

    return this;
  }

  serialize(): Micra.ErrorMessage[] {
    return this._messages.map((message) => ({
      status: this.statusCode,
      title: this.message,
      extra: message,
    }));
  }
}
