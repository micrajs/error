/* eslint-disable @typescript-eslint/no-explicit-any */
import {WrappedError} from '../classes/WrappedError';
import {isMicraError} from './isMicraError';

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

  const error =
    value &&
    typeof value === 'object' &&
    value.stack &&
    value.message &&
    typeof value.stack === 'string' &&
    typeof value.message === 'string'
      ? value
      : new Error(
          JSON.stringify(
            `Non-standard value thrown while running application: ${value}`,
          ),
        );

  return new WrappedError(error);
}
