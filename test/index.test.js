/* eslint no-new-func: 0 */
/* global describe, it */

'use strict'

const assert = require('assert')
const serializeToModule = require('..')

if (typeof assert.deepStrictEqual === 'undefined') {
  assert.deepStrictEqual = assert.deepEqual // eslint-disable-line
}

function log (arg) { // eslint-disable-line no-unused-vars
  console.log(JSON.stringify(arg))
}

function getObj (str) {
  return new Function('var module = {};\n' + str + ';\nreturn module.exports')()
}

describe('#serializeToModule', function () {
  it('object of objects', function () {
    const r = {
      one: true,
      two: 'a string\nwith multiple\r\nlines.',
      'thr-ee': undefined
    }
    const o = {
      a: r,
      b: r,
      c: {
        d: r
      }
    }
    const res = serializeToModule(o)
    const exp = 'var m = {\n  a: {\n    one: true,\n    two: "a string\\nwith multiple\\r\\nlines.",\n    "thr-ee": undefined\n  },\n  b: {\n    one: true,\n    two: "a string\\nwith multiple\\r\\nlines.",\n    "thr-ee": undefined\n  },\n  c: {\n    d: {\n      one: true,\n      two: "a string\\nwith multiple\\r\\nlines.",\n      "thr-ee": undefined\n    }\n  }\n};\nmodule.exports = m;\n'
    // log(res)
    assert.strictEqual(res, exp)
    assert.deepStrictEqual(o, getObj(res))
  })
  it('object of objects using references', function () {
    const r = {
      one: true,
      two: 'a string\nwith multiple\r\nlines.',
      'thr-ee': undefined
    }
    const o = {
      a: r,
      b: r,
      c: {
        d: r,
        0: r,
        'spa ce': r
      },
      0: r,
      'spa ce': r
    }
    const res = serializeToModule(o, {
      reference: true,
      beautify: false
    })
    const exp = 'var m = {"0": {one: true, two: "a string\\nwith multiple\\r\\nlines.", "thr-ee": undefined}, c: {}};\nm.a = m["0"];\nm.b = m["0"];\nm.c["0"] = m["0"];\nm.c.d = m["0"];\nm.c["spa ce"] = m["0"];\nm["spa ce"] = m["0"];\nmodule.exports = m;\n'
    // log(res)
    assert.strictEqual(res, exp)
    assert.deepStrictEqual(o, getObj(res))
  })
  it('object of objects - beautify', function () {
    const r = {
      one: true,
      'thr-ee': /^test$/
    }
    const o = {
      a: r,
      b: r,
      c: {
        d: r
      }
    }
    const res = serializeToModule(o, {
      reference: true
    })
    const exp = 'var m = {\n  a: {\n    one: true,\n    "thr-ee": new RegExp("^test$", "")\n  },\n  c: {}\n};\nm.b = m.a;\nm.c.d = m.a;\nmodule.exports = m;\n'
    // log(res);
    assert.strictEqual(res, exp)
    assert.deepStrictEqual(o, getObj(res))
  })
  it('obj - with comments header', function () {
    const o = {
      a: {
        b: 'one'
      }
    }
    const res = serializeToModule(o, {
      comment: 'eslint-disable'
    })
    const exp = '/* eslint-disable */\nvar m = {\n  a: {\n    b: "one"\n  }\n};\nmodule.exports = m;\n'
    // log(res)
    assert.strictEqual(res, exp)
    assert.deepStrictEqual(o, getObj(res))
  })
  it('obj - with comments header and exporting esm module', function () {
    const o = {
      a: {
        b: 'one'
      }
    }
    const res = serializeToModule(o, {
      comment: 'eslint-disable',
      esm: true
    })
    const exp = '/* eslint-disable */\nconst m = {\n  a: {\n    b: "one"\n  }\n};\nexport default m;\n'
    // log(res)
    assert.strictEqual(res, exp)
  })
})
