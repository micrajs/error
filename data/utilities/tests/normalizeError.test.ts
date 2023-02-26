import {HTTPError} from '../../classes/HTTPError';
import {isMicraError} from '../isMicraError';
import {normalizeError} from '../normalizeError';

describe('normalizeError', () => {
  it('should return a Micra.Error instance if a Micra.Error is passed', () => {
    const thrown = new HTTPError(500);
    const error = normalizeError(thrown);

    expect(isMicraError(error)).toBe(true);
    expect(error).toHaveProperty('statusCode', thrown.statusCode);
    expect(error.serialize()).toMatchObject(thrown.serialize());
    expect(error).toHaveProperty('message', thrown.message);
    expect(error).toHaveProperty('stack', thrown.stack);
  });

  it('should return a Micra.Error instance if an Error is passed', () => {
    const thrown = new Error('test');
    const error = normalizeError(thrown);

    expect(isMicraError(error)).toBe(true);
    expect(error).toHaveProperty('statusCode', 500);
    expect(error).toHaveProperty('serialize');
    expect(error).toHaveProperty('message', thrown.message);
    expect(error).toHaveProperty('stack', thrown.stack);
  });

  it('should return a Micra.Error instance if an Error is passed', () => {
    const thrown = 'test';
    const error = normalizeError(thrown);

    expect(isMicraError(error)).toBe(true);
    expect(error).toHaveProperty('statusCode', 500);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
