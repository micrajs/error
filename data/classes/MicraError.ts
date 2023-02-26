/// <reference types="@micra/core/error" />

import {MICRA_ERROR_SYMBOL} from '../constants';

export abstract class MicraError extends Error implements Micra.Error {
  [MICRA_ERROR_SYMBOL]: boolean;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MicraError.prototype);
    this[MICRA_ERROR_SYMBOL] = true;
  }

  abstract statusCode: number;

  abstract serialize(): Micra.ErrorMessage[];
}
