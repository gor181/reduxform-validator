[![build status](	https://img.shields.io/travis/gor181/reduxform-validator.svg?branch=master&style=flat-square)](https://travis-ci.org/gor181/reduxform-validator)
[![version](https://img.shields.io/npm/v/reduxform-validator.svg?style=flat-square)](https://www.npmjs.com/package/reduxform-validator)
[![downloads](https://img.shields.io/npm/dm/reduxform-validator.svg?style=flat-square)](https://npm-stat.com/charts.html?package=reduxform-validator&from=2016-01-01)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](http://opensource.org/licenses/MIT)

# reduxform-validator

Exposes methods `validate` and `validateMany` for validating your redux-form payloads. One would use it to get rid of the boilerplate when writing form field validations.  

__We also made a video tutorials if you are interested on how this library was inspired:__

[![Developing validate function](https://img.youtube.com/vi/agI0HYYGynY/0.jpg)](https://www.youtube.com/watch?v=agI0HYYGynY "Developing validate function")

[![Developing validateMany function](https://img.youtube.com/vi/MKpGhs5zxB4/0.jpg)](https://www.youtube.com/watch?v=MKpGhs5zxB4 "Developing validateMany function")

## Installation via NPM / Yarn

```
npm install reduxform-validator --save
```
```
yarn add reduxform-validator
```

## Usage 
### validate(predicate, value, error)

``` javascript
import * as v from 'reduxform-validator';

// Custom validator function
// You could also use any function from lodash/underscore etc.
const hasValue = val => val && val.length > 0;

const validate = values => ({
  name: v.validate(hasValue, values.name, 'enter your name'),
  surname: v.validate(hasValue, values.surname, 'enter your surname'),
});
```

### validateMany(validators, value)

``` javascript
import * as v from 'reduxform-validator';

const validate = values => ({
  age: v.validateMany([
    {
      predicate: v => !!v,
      error: 'Please set your age',
    },
    {
      predicate: v => !isNaN(Number(values.age)),
      error: 'Age must be a number!',
    },
    {
      predicate: v => v >= 18,
      error: 'You must be at least 18 years old',
    },
  ], values.age),
});
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build run `npm run build`
To test run `npm run test`

## License

MIT Licensed  
Copyright (c) 2017 Goran Udosic
