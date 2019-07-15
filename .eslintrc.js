module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest": true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
  },
};
