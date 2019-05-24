# serialize-to-module

> serialize objects to node module

[![NPM version](https://badge.fury.io/js/serialize-to-module.svg)](https://www.npmjs.com/package/serialize-to-module/)
[![Build Status](https://secure.travis-ci.org/commenthol/serialize-to-module.svg?branch=master)](https://travis-ci.org/commenthol/serialize-to-module)

Serialize objects into a `require`-able module while checking circular structures and respecting references.

The following Objects are supported

- String
- Number
- Boolean
- Object
- Array
- RegExp
- Error
- Date
- Buffer
- Int8Array, Uint8Array, Uint8ClampedArray
- Int16Array, Uint16Array
- Int32Array, Uint32Array, Float32Array
- Float64Array

## Table of Contents

<!-- !toc (minlevel=2 omit="Table of Contents") -->

* [Methods](#methods)
  * [serializeToModule](#serializetomodule)
* [Contribution and License Agreement](#contribution-and-license-agreement)
* [License](#license)

<!-- toc! -->

## Methods

### serializeToModule

`serializeToModule(source, opts, opts.ignoreCircular, opts.reference, opts.comment, opts.beautify) `

serialize to a module which can be `require`ed.

#### Example - serializing while respecting references

```js
var serialTM = require('serialize-to-module')
var obj = { object: { regexp: /^test?$/ } }
obj.reference = obj.object
console.log(serialTM(obj, { reference: true }))
//> var m = module.exports = {
//>     object: {
//>         regexp: /^test?$/
//>     }
//> };
//> m.reference = m.object;
```

**Parameters**

**source**: `Object | Array | function | Any`, source to serialize

**opts**: `Object`, options

**opts.ignoreCircular**: `Boolean`, ignore circular objects

**opts.reference**: `Boolean`, reference instead of a copy (requires post-processing of opts.references)

**opts.comment**: `Boolean`, add a comments - useful for linting tools e.g. using 'eslint-disable'

**opts.beautify**: `Boolean | Object`, beautify output - default is `false`. If Object then use je-beautify options.

**opts.unsafe**: `Boolean`, do not escape chars `<>/`

**Returns**: `String`, serialized representation of `source` as module

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your
code to be distributed under the MIT license. You are also implicitly
verifying that all code is your original work or correctly attributed
with the source of its origin and licence.

## License

Copyright (c) 2016- commenthol (MIT License)

See [LICENSE][] for more info.

[LICENSE]: ./LICENSE
