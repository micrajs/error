import {MicraError} from './MicraError';

export class WrappedError extends MicraError {
  errorMessage: Micra.ErrorMessage;

  get statusCode() {
    return this.errorMessage.status;
  }

  constructor(
    error: Error,
    {
      status = 500,
      extras,
      instance,
      title = 'Internal Server Error',
      type,
    }: Omit<Partial<Micra.ErrorMessage>, 'detail'> = {},
  ) {
    super(error.message);
    Object.assign(this, error);
    Object.setPrototypeOf(this, WrappedError.prototype);
    this.errorMessage = {
      status,
      extras,
      instance,
      title,
      type,
      detail: error.message,
    };
  }

  serialize(): Micra.ErrorMessage[] {
    return [this.errorMessage];
  }
}
