# serialize-to-module

> serialize objects to node module

[![NPM version](https://badge.fury.io/js/serialize-to-module.svg)](https://www.npmjs.com/package/serialize-to-module/)

Serialize objects into a module while checking circular structures and respecting references. The package is ESM-first; `require()` remains supported for CommonJS consumers.

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

- [Methods](#methods)
  - [serializeToModule](#serializetomodule)
- [Contribution and License Agreement](#contribution-and-license-agreement)
- [License](#license)

<!-- toc! -->

## Methods

### serializeToModule

`serializeToModule(source, opts, opts.ignoreCircular, opts.reference, opts.comment, opts.beautify) `

Serialize to an ESM module by default. Set `opts.esm` to `false` to generate CommonJS.

#### Example - serializing while respecting references

```js
import serialTM from 'serialize-to-module'
const obj = { object: { regexp: /^test?$/ } }
obj.reference = obj.object
console.log(serialTM(obj, { reference: true }))
//> const m = {
//>   object: {
//>     regexp: new RegExp("^test?$", "")
//>   }
//> };
//> m.reference = m.object;
//> export default m;
```

**Parameters**

**source**: `Object | Array | function | Any`, source to serialize

**opts**: `Object`, options

**opts.ignoreCircular**: `Boolean`, ignore circular objects

**opts.reference**: `Boolean`, reference instead of a copy (requires post-processing of opts.references)

**opts.comment**: `Boolean`, add a comments - useful for linting tools e.g. using 'eslint-disable'

**opts.beautify**: `Boolean | Object`, beautify output - default is `false`. If Object then use je-beautify options.

**opts.unsafe**: `Boolean`, do not escape chars `<>/`

**opts.esm**: `Boolean`, defaults to `true` (ESM); set to `false` to generate CommonJS (`module.exports`)

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
