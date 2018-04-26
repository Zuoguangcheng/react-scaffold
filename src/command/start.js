import Webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import path from 'path';

import scaffoldWebpack from '../config/webpack.config';

let start = args => {

  const scaffoldWebpackConfig = scaffoldWebpack(args.cwd);

  scaffoldWebpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:9000/")
  scaffoldWebpackConfig.entry.app.unshift('webpack/hot/dev-server');

  const pkg = require(path.join(args.cwd, './webpack/webpack.config.dev.js'))(scaffoldWebpackConfig);

  const compiler = Webpack(pkg);

  const devServer = { //webpack-dev-server配置热更新以及跨域
    historyApiFallback: true, //不跳转
    noInfo: true,
    inline: true, //实时刷新
    // port: '8888',  //不指定固定端口
    hot: true,
    proxy: {
      '/list': {
        target: 'http://lol.qq.com/web201310/js/videodata/LOL_VIDEOLIST_IDX3.js',
        pathRewrite: {
          '^/list': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  }

  const server = new WebpackDevServer(compiler, devServer)

  server.listen('9000', function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log('server start at ');
  })
}

module.exports = start;