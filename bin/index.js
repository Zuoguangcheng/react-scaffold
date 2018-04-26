const { resolve } = require('path')
const r = path => resolve(__dirname, path)

require('babel-polyfill');
let babelRegister = require('babel-register');

babelRegister({
  'presets': [
    'stage-3',
    ['latest-node', { 'target': 'current' }]
  ],
  'plugins': [
    'transform-decorators-legacy',
  ]
})

require('../src/');

