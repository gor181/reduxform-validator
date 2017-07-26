export const validate = (predicate, value, error) => {
  if (typeof predicate !== 'function') {
    throw new Error('Predicate should be a function');
  }

  if (typeof error !== 'string') {
    throw new Error('Error should be a string');
  }

  const isValid = predicate(value);

  if (isValid) {
    return undefined;
  }

  return error;
};

export const validateMany = (validators = [], value) => {
  const errors = validators.reduce((result, validator) => {
		if (typeof validator.predicate !== 'function') {
			throw new Error('validator.predicate should be a function, got ' + typeof validator.predicate);
		}

		if (typeof validator.error !== 'string') {
			throw new Error('validator.error should be a string, got ' + typeof validator.error);
		}
		
    const isValid = validator.predicate(value);

    if (!isValid) {
      result.push(validator.error);
    }

    return result;
  }, []);

  return errors.length ? errors[0] : undefined;
};
