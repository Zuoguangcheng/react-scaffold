const net = require('net')
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const scaffoldWebpack = require('../config/webpack.config')

// 检测端口是否被占用
const portIsOccupied = (port) => {
  return new Promise((resolve, reject) => {
    // 创建服务并监听该端口
    var server = net.createServer().listen(port)

    server.on('listening', function () { // 执行这块代码说明端口未被占用
      server.close(() => {
        // 关闭服务
        resolve(false);
      })
    })

    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        resolve(true);
      }
    })
  })

}


const availablePorts = async port => {
  let availablePort = Number(port);
  let isOccupied = await portIsOccupied(availablePort);

  while (isOccupied) {
    console.log(availablePort + '被占用了')

    availablePort += 1;
    isOccupied = await portIsOccupied(availablePort);
  }
  return availablePort;
}

const getPort = _args => {
  if (Array.isArray(_args)) {
    for (let i = 0; i < _args.length; i++) {
      if (_args[i].includes('port')) {
        let port = 8888;
        try {
          port = _args[i].split('=')[1];
        } catch (e) {

        }
        return port;
      }
    }

    return 8888
  } else {
    return 8888;
  }
}


let start = async args => {

  const scaffoldWebpackConfig = scaffoldWebpack(args.cwd);

  let scaffoldConfig = scaffoldWebpackConfig;

  fs.exists(path.join(args.cwd, './webpack/webpack.config.dev.js'), (exist) => {
    if (exist) {
      scaffoldConfig = require(path.join(args.cwd, './webpack/webpack.config.dev.js'))(scaffoldWebpackConfig);
    }
  })

  scaffoldConfig.devServer.port = getPort(args._);
  const port = await availablePorts(scaffoldConfig.devServer.port);

  scaffoldConfig.entry.app.unshift(`webpack-dev-server/client?http://localhost:${port}/`)
  scaffoldConfig.entry.app.unshift('webpack/hot/dev-server');

  const compiler = Webpack(scaffoldConfig);
  const server = new WebpackDevServer(compiler, scaffoldConfig.devServer)


  console.log(chalk.blue('server start at port...' + port));
  server.listen(port, function (err, result) {
    if (err) {
      console.log('err', err);
    }

    console.log(chalk.blue('server start at port' + port));
  })

}

module.exports = start;