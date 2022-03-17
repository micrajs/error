import {MicraError} from '@/data/classes/MicraError';
import {isMicraError} from '@/data/utilities/isMicraError';

describe('isMicraError tests', () => {
  it('should return true if it is a Micra.Error', () => {
    class MyMicraError extends MicraError {
      statusCode = 123;
      serialize = (): Micra.ErrorMessage[] => {
        return [];
      };
    }

    const error = new MyMicraError('Something went wrong');

    expect(isMicraError(error)).toBeTruthy();
  });

  it('should return false if the value is not an object', () => {
    const error = 123;

    expect(isMicraError(error)).toBeFalsy();
  });

  it('should return false if the value is null', () => {
    const error = null;

    expect(isMicraError(error)).toBeFalsy();
  });

  it('should return false if the value is an array', () => {
    const error = [123];

    expect(isMicraError(error)).toBeFalsy();
  });

  it('should return false if the value is a generic object', () => {
    const error = {};

    expect(isMicraError(error)).toBeFalsy();
  });

  it('should return false if the value is a generic Error', () => {
    const error = new Error('Something went wrong');

    expect(isMicraError(error)).toBeFalsy();
  });

  it('should return false if an error is thrown', () => {
    const error = {
      get message() {
        throw new Error('something went wrong');
      },
    };

    expect(isMicraError(error)).toBeFalsy();
  });
});
