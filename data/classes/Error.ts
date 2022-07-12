import {MicraError} from './MicraError';

export class Error extends MicraError {
  statusCode: number;
  errorMessages: Micra.ErrorMessage[];

  constructor(...errorMessages: Micra.ErrorMessage[]) {
    super('');
    this.statusCode = 500;
    this.errorMessages = errorMessages;
    Object.setPrototypeOf(this, Error.prototype);
  }

  serialize(): Micra.ErrorMessage[] {
    return this.errorMessages;
  }
}
