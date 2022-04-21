import {isMicraError} from '../../utilities';
import {ValidationError} from '../ValidationError';

type TestValidationError = ValidationError & {
  _messages: Micra.ValidationErrorExtras<string>[];
};

describe('ValidationError tests', () => {
  it('return true passed to isMicraError utility', () => {
    const error = new ValidationError();

    const result = isMicraError(error);

    expect(result).toBe(true);
  });

  it('returns 422 statusCode', () => {
    const error = new ValidationError();

    expect(error.statusCode).toBe(422);
  });

  it('sets a new error message for a given field', () => {
    const error = new ValidationError() as TestValidationError;
    const fieldError = {
      field: 'field',
      message: 'error message',
    };

    error.set(fieldError.field, {
      message: fieldError.message,
    });

    expect(error._messages).toMatchObject([fieldError]);
  });

  it('sets a multiples error messages for a given field', () => {
    const error = new ValidationError() as TestValidationError;
    const fieldError1 = {
      field: 'field',
      message: 'error message',
    };
    const fieldError2 = {
      field: 'field',
      message: 'error message',
    };

    error.set(fieldError1.field, {
      message: fieldError1.message,
    });
    error.set(fieldError2.field, {
      message: fieldError2.message,
    });

    expect(error._messages).toMatchObject([fieldError1, fieldError2]);
  });

  it('gets error messages for a given field', () => {
    const error = new ValidationError();
    const fieldError = {
      field: 'field',
      message: 'error message',
    };
    error.set(fieldError.field, {
      message: fieldError.message,
    });

    const result = error.get(fieldError.field);

    expect(result).toMatchObject([fieldError]);
  });

  it('returns an empty array for an inexistent field', () => {
    const error = new ValidationError();

    const result = error.get('some random field');

    expect(result).toMatchObject([]);
  });

  it('returns true if there are any error messages', () => {
    const error = new ValidationError();
    error.set('field', {
      message: 'error message',
    });

    const result = error.hasAny();

    expect(result).toBe(true);
  });

  it('returns false if there are no error messages', () => {
    const error = new ValidationError();

    const result = error.hasAny();

    expect(result).toBe(false);
  });

  it('returns true if there are error messages for a given field', () => {
    const error = new ValidationError();
    error.set('field', {
      message: 'error message',
    });

    const result = error.has('field');

    expect(result).toBe(true);
  });

  it('returns false if there are no error messages for a given field', () => {
    const error = new ValidationError();

    const result = error.has('field');

    expect(result).toBe(false);
  });

  it('returns an array of error messages', () => {
    const error = new ValidationError();
    error.set('field', {
      message: 'error message',
    });

    const result = error.serialize();

    expect(result).toMatchObject([
      {
        status: 422,
        title: 'Validation Error',
        extra: {
          field: 'field',
          message: 'error message',
        },
      },
    ]);
  });

  it('returns a multiples error messages', () => {
    const error = new ValidationError();
    error.set('field1', {
      message: 'error message',
    });
    error.set('field2', {
      message: 'error message',
    });

    const result = error.serialize();

    expect(result).toMatchObject([
      {
        status: 422,
        title: 'Validation Error',
        extra: {
          field: 'field1',
          message: 'error message',
        },
      },
      {
        status: 422,
        title: 'Validation Error',
        extra: {
          field: 'field2',
          message: 'error message',
        },
      },
    ]);
  });

  it('returns error messages with a custom message', () => {
    const error = new ValidationError('custom message');
    error.set('field', {
      message: 'error message',
    });

    const result = error.serialize();

    expect(result).toMatchObject([
      {
        status: 422,
        title: 'custom message',
        extra: {
          field: 'field',
          message: 'error message',
        },
      },
    ]);
  });
});
