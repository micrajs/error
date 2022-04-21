import {MicraError} from './MicraError';

export class WrappedError extends MicraError {
  statusCode = 500;

  constructor(error: Error) {
    super(error.message);
    Object.assign(this, error);
    Object.setPrototypeOf(this, WrappedError.prototype);
  }

  serialize(): Micra.ErrorMessage[] {
    return [
      {
        status: this.statusCode,
        title: 'Internal Server Error',
        detail: this.message,
      },
    ];
  }
}
