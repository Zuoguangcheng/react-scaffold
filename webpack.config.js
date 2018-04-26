var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter((x) => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    cache: true,
    entry: [
        './bin/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    target: 'node',
    externals: nodeModules,
    module: {
        loaders: []
    },
    resolve: {
        extensions: ['.js', '.json']
    }
}