'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var validate = exports.validate = function validate(predicate, value, error) {
  if (typeof predicate !== 'function') {
    throw new Error('Predicate should be a function');
  }

  if (typeof error !== 'string') {
    throw new Error('Error should be a string');
  }

  var isValid = predicate(value);

  if (isValid) {
    return undefined;
  }

  return error;
};

var validateMany = exports.validateMany = function validateMany() {
  var validators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments[1];

  var errors = validators.reduce(function (result, validator) {
    if (typeof validator.predicate !== 'function') {
      throw new Error('validator.predicate should be a function, got ' + _typeof(validator.predicate));
    }

    if (typeof validator.error !== 'string') {
      throw new Error('validator.error should be a string, got ' + _typeof(validator.error));
    }

    var isValid = validator.predicate(value);

    if (!isValid) {
      result.push(validator.error);
    }

    return result;
  }, []);

  return errors.length ? errors[0] : undefined;
};