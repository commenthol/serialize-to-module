/*
 * @copyright 2016- commenthol
 * @license MIT
 */

import serialize from 'serialize-to-js'
import jsBeautify from 'js-beautify'

/**
 * serialize to an ESM module, or CommonJS when `opts.esm` is false.
 *
 * @example <caption>serializing while respecting references</caption>
 * import serialTM from 'serialize-to-module';
 * const obj = { object: { regexp: /^test?$/ } };
 * obj.reference = obj.object;
 * console.log(serialTM(obj, { reference: true }));
 * //> const m = {
 * //>   object: {
 * //>     regexp: new RegExp("^test?$", "")
 * //>   }
 * //> };
 * //> m.reference = m.object;
 * //> export default m;
 *
 * @param {unknown} source - value to serialize
 * @param {Object} [opts] - serialization and output options
 * @param {boolean} [opts.ignoreCircular] - ignore circular objects
 * @param {boolean} [opts.reference] - preserve repeated references with assignments
 * @param {string} [opts.comment] - prepend a block comment
 * @param {boolean|Object} [opts.beautify=true] - format output; set to false to disable or pass js-beautify options
 * @param {boolean} [opts.unsafe] - do not escape chars `<>/`
 * @param {boolean} [opts.esm=true] - set to false to generate CommonJS instead of ESM
 * @returns {string} serialized module source
 */
export default function serializeToModule(source, opts) {
  opts = opts || {}
  let out = ''
  if (opts.reference) {
    opts.references = []
  }
  if (opts.comment) {
    out = '/* ' + opts.comment + ' */\n'
  }
  const esm = opts.esm !== false
  out += (esm ? 'const' : 'var') + ' m = ' + serialize(source, opts) + ';\n'
  if (opts.references) {
    opts.references.forEach(function (i) {
      out += 'm' + i[0] + ' = m' + i[1] + ';\n'
    })
  }
  if (esm) {
    out += 'export default m;\n'
  } else {
    out += 'module.exports = m;\n'
  }

  if (opts.beautify !== false) {
    const beautify = jsBeautify.js_beautify
    if (typeof opts.beautify !== 'object') {
      opts.beautify = {
        indent_size: 2,
        indent_char: ' '
      }
    }
    out = beautify(out, opts.beautify) + '\n'
  }

  return out
}
