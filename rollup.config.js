import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default [
  // CJS
  {
    input: 'src/index.js',
    output: { 
      file: `dist/cjs/${pkg.name}.js`,
      format: 'cjs',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },

  // ESM
  {
    input: 'src/index.js',
    output: { 
      file: `dist/esm/${pkg.name}.js`,
      format: 'es',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [babel()]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      name: pkg.name,
      file: `dist/umd/${pkg.name}.js`,
      format: 'umd',
      indent: false
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: `dist/umd/${pkg.name}.min.js`,
      format: 'umd',
      name: pkg.name,
      indent: false
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
