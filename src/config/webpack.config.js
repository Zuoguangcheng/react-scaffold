//当前运行环境
const production = process.env.NODE_ENV === 'production';
console.log('production=====>', production);

const config = cwd => {
  if (production) {
    return require('./webpack.config.prod')(cwd);
  } else {
    return require('./webpack.config.dev')(cwd);
  }
}

module.exports = config;