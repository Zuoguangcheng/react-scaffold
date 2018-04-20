let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


const name = cwd => {
  console.log('cwd', cwd);
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor", //和配置的入口对应
      minChunks: 2,
    }),
    new HtmlWebpackPlugin({
      template: path.join(cwd, 'index.html') // Load a custom template
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ]

  let config = {
    entry: {
      app: [
        'babel-polyfill',
        './src/index'
      ],
      vendor: ['react', 'react-dom']
    },
    output: {
      filename: '[name].js',
      path: path.join(cwd, 'build'),
      publicPath: '/',
      chunkFilename: '[name].js'
    },
    devtool: 'eval-source-map',
    plugins,
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
      modules: [
        path.resolve(cwd, 'node_modules'),
        path.join(cwd, './src')
      ],
      alias: {
        "actions": path.resolve(cwd, "src/actions"),
        "components": path.resolve(cwd, "src/components"),
        "containers": path.resolve(cwd, "src/containers"),
        "reducers": path.resolve(cwd, "src/reducers"),
        "utils": path.resolve(cwd, "src/utils")
      }
    },

    module: {
      rules: [{
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /(node_modules)/
      }, {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }, "sass-loader"]
        })
      }, {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true //css压缩
            }
          }, "less-loader"]
        })
      }, {
        test: /\.(png|jpg|gif|md)$/,
        use: ['file-loader?limit=10000&name=[md5:hash:base64:10].[ext]']
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=10000&mimetype=images/svg+xml']
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }]
    },
    devServer: { //webpack-dev-server配置热更新以及跨域
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
    },
  }
  return config;
}

module.exports = name;