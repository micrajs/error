/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import {MICRA_ERROR_SYMBOL} from '../constants';

/**
 * It checks if the given value is an instance of Micra.Error.
 *
 * @param maybeError - Value to verify if it is an instance of a Micra.Error.
 * @returns true if the value is an instance of a Micra.Error, false otherwise.
 */
export function isMicraError(maybeError: any): maybeError is Micra.Error {
  try {
    return (
      maybeError != null &&
      typeof maybeError === 'object' &&
      !Array.isArray(maybeError) &&
      maybeError.message != null &&
      maybeError.stack != null &&
      maybeError.statusCode != null &&
      maybeError.serialize != null &&
      maybeError[MICRA_ERROR_SYMBOL] === true
    );
  } catch (e) {
    return false;
  }
}
