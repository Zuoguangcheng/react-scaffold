const path = require('path');
const Webpack = require('webpack');

const scaffoldWebpack = require('../config/webpack.config')

let build = args => {
  console.log('args', args);

  const scaffoldWebpackConfig = scaffoldWebpack(args.cwd);

  const pkg = require(path.join(args.cwd, './webpack/webpack.config.prod.js'))(scaffoldWebpackConfig);

  const compiler = Webpack(pkg);
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