/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * It checks if the given value is an instance of Error.
 *
 * @param maybeError - Value to verify if it is an instance of a Error.
 * @returns true if the value is an instance of a Micra.Error, false otherwise.
 */
export function isError(maybeError: any): maybeError is Error {
  try {
    return (
      maybeError != null &&
      typeof maybeError === 'object' &&
      !Array.isArray(maybeError) &&
      maybeError.message != null &&
      maybeError.stack != null
    );
  } catch (e) {
    return false;
  }
}
