/// <reference types="@micra/core/error" />

import {MICRA_ERROR_SYMBOL, MICRA_ERROR_TYPE} from '../constants';

export abstract class MicraError extends Error implements Micra.Error {
  [MICRA_ERROR_SYMBOL]: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MicraError.prototype);
    this[MICRA_ERROR_SYMBOL] = MICRA_ERROR_TYPE;
  }

  abstract statusCode: number;

  abstract serialize(): Micra.ErrorMessage[];
}
