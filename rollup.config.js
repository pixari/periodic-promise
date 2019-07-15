import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript';
import pkg from './package.json';


export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'periodic-promise',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      rollupTypescript(),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    external: ['ms'],
    plugins: [
      rollupTypescript(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
