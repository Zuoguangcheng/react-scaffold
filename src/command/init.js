const fs = require('fs');
const path = require('path');
const stat = fs.stat;
const child_process = require('child_process');
const execFile = child_process.execFile;
const chalk = require('chalk');

const from = path.join(__dirname, '../../template');
const getTemplate = path.join(__dirname, '../../script/get-template.sh');

const copy = function (src, dst) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      const _src = src + '/' + path;
      const _dst = dst + '/' + path;
      let readable;
      let writable;

      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }

        // 判断是否为文件
        if (st.isFile()) {
          // 创建读取流
          readable = fs.createReadStream(_src);
          // 创建写入流
          writable = fs.createWriteStream(_dst);
          // 通过管道来传输流
          readable.pipe(writable);
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copy);
        }
      });
    });
  });
};


var exists = function (src, dst, callback) {
  fs.exists(dst, function (exists) {
    // 已存在
    if (exists) {
      callback(src, dst);
    }
    // 不存在
    else {
      fs.mkdir(dst, function () {
        callback(src, dst);
      });
    }
  });
};



const init = (argv) => {
  const nameOrPath = argv._[1];

  if (!nameOrPath) {
    console.error('请输入项目名称');
    return false;
  }
  if (nameOrPath.includes('https://github.com') || nameOrPath.includes('git@github.com:')) {
    console.log(chalk.blue('下载模板文件......'));
    execFile(getTemplate, [argv.cwd, argv._[1]], (err, stdout, stderr) => {
      if (!err) {
        console.log(chalk.green('下载成功'));
      } else {
        console.log(chalk.red('下载出错'));
      }
    })
  } else {
    const to = path.join(argv.cwd, argv._[1]);
    exists(from, to, copy);
  }
}


module.exports = init;