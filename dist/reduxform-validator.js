(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.validator = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});