import { globalIgnores } from 'eslint/config'

const rules = {
  'no-undef': 'error',
  'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
  'no-constant-condition': 'error',
  'no-debugger': 'error',
  'no-duplicate-imports': 'error',
  'no-unreachable': 'error',
  'valid-typeof': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  'no-new-func': 'error',
  eqeqeq: ['error', 'always'],
  semi: ['error', 'never'],
  quotes: ['error', 'single', { avoidEscape: true }],
  indent: ['error', 2],
  'comma-dangle': ['error', 'never'],
  'comma-spacing': 'error',
  'key-spacing': 'off',
  'keyword-spacing': 'error',
  'no-trailing-spaces': 'error',
  'eol-last': ['error', 'always'],
  'space-before-function-paren': [
    'error',
    { anonymous: 'always', named: 'never', asyncArrow: 'always' }
  ],
  'space-infix-ops': 'error',
  'arrow-spacing': 'error',
  'object-curly-spacing': ['error', 'always'],
  'space-before-blocks': 'error',
  curly: 'error'
}

export default [
  globalIgnores(['coverage/**', 'tmp/**']),
  {
    files: ['src/**/*.js', 'test/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { describe: 'readonly', it: 'readonly' }
    },
    rules
  }
]
