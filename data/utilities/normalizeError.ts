/* eslint-disable @typescript-eslint/no-explicit-any */
import {WrappedError} from '../classes/WrappedError';
import {isMicraError} from './isMicraError';
import {isError} from './isError';
import {MICRA_ERROR_SYMBOL} from '../constants';

/**
 * It normalizes the given value to an instance of Micra.Error.
 *
 * @param value - Value to be normalized.
 * @returns A new Micra.Error instance.
 */
export function normalizeError(value: any): Micra.Error {
  if (isMicraError(value)) {
    return value;
  }
  if (isError(value)) {
    const micraError = value as Micra.Error;
    (micraError as any)[MICRA_ERROR_SYMBOL] = true;
    micraError.statusCode = 500;
    micraError.serialize = () => [
      {
        status: 500,
        title: 'Internal Server Error',
        detail: micraError.message,
      },
    ];

    return micraError;
  }

  return new WrappedError(
    new Error(
      JSON.stringify(
        `Non-standard value thrown while running application: ${value}`,
      ),
    ),
  );
}
