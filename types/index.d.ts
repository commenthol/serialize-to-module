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
export default function serializeToModule(source: unknown, opts?: {
    ignoreCircular?: boolean;
    reference?: boolean;
    comment?: string;
    beautify?: boolean | Object;
    unsafe?: boolean;
    esm?: boolean;
}): string;
