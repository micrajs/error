import {MICRA_ERROR_SYMBOL, MICRA_ERROR_TYPE} from '../constants';

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
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
      maybeError[MICRA_ERROR_SYMBOL] === MICRA_ERROR_TYPE
    );
  } catch (e) {
    return false;
  }
}
