import {
  validate,
  validateMany,
} from '../src/validator';

const noop = () => {};

describe('helpers/validations', () => {
  describe('#validate', () => {
    it('is a function', () => {
      expect(validate).toBeInstanceOf(Function);
    });

    it('throws an error if predicate is not a function', () => {
      expect(() => validate(null, 'string', 'error'))
        .toThrow();
    });

    it('throws an error if error string is not set', () => {
      expect(() => validate(noop, 'string', null))
        .toThrow();
    });

    describe('validates', () => {
      it('returns undefined when valid', () => {
        const result = validate(
          value => value.length > 0,
          'a value',
          'an error',
        );

        expect(result).toBeUndefined();
      });

      it('returns an error when invalid', () => {
        const result = validate(
          value => value.length > 0,
          '',
          'value cannot be empty!',
        );

        expect(result).toEqual('value cannot be empty!');
      });
    });
  });

  describe('#validateMany', () => {
    it('is a function', () => {
      expect(validateMany).toBeInstanceOf(Function);
    });

    it('throws an error if predicate is not a function', () => {
      expect(() =>
        validateMany([{
          predicate: null,
          error: 'an error',
        }]),
      ).toThrow(/validator.predicate should be a function/);
    });

    it('throws an error if error is not a string', () => {
      expect(() =>
        validateMany([{
          predicate: noop,
          error: null,
        }]),
      ).toThrow(/validator.error should be a string/);
    });

    describe('validates', () => {
      it('returns undefined when when valid', () => {
        const result = validateMany([
          {
            predicate: v => v.length > 0,
            error: 'Cannot be empty!',
          },
          {
            predicate: v => v.length < 15,
            error: 'Less than 15 please!',
          },
        ], 'a valid string');

        expect(result).toBeUndefined();
      });

      it('returns an error string when invalid', () => {
        const result = validateMany([
          {
            predicate: v => v.length > 0,
            error: 'Cannot be empty!',
          },
          {
            predicate: v => v.length < 15,
            error: 'Less than 15 please!',
          },
        ], 'this string should have more than 15 characters');

        expect(result).toEqual('Less than 15 please!');
      });
    });
  });
});
