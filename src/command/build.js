import path from 'path';
import Webpack from 'webpack';

import scaffoldWebpack from '../config/webpack.config';

let build = args => {
  console.log('args', args);
  // const scaffoldWebpack = require(path.join('../config/', 'webpack.config.js'));

  const pkg = require(path.join(args.cwd, 'webpack.config.js'))

  const compiler = Webpack(scaffoldWebpack(args.cwd));
  compiler.run((err, stats) => {
    if (err) {
      console.log('err===>', err);
      return
    }
    if (stats.compilation.errors.length) {
      // console.log('stats.compilation.errors.length', stats.compilation.errors)
      return
    }
    console.log(`build successed - s`)
  })
}

module.exports = build;