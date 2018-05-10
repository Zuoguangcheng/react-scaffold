const fs = require('fs');
const path = require('path');
const stat = fs.stat;
const child_process = require('child_process');
const execFile = child_process.execFile;
const chalk = require('chalk');

const from = path.join(__dirname, '../../template');

const getTemplate = path.join(__dirname, '../../script/get-template.sh');
const install = path.join(__dirname, '../../script/install.sh');

let fileCount = 0;
let copyFileCount = 0;

const getFileCount = src => {
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      const _src = src + '/' + path;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
          fileCount += 1;
        } else if (st.isDirectory()) {
          getFileCount(_src);
        }
      });
    });
  });
}

const copy = function (src, dst, pathName) {
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
          readable.on('end', () => {
            copyFileCount++;
            if (copyFileCount === fileCount) {
              console.log('安装中，，，，');
              const inn = execFile(install, [pathName]);
              inn.stdout.on('data', function (data) {
                console.log(data);
              });
              inn.stdout.on('close', function () {
                console.log(chalk.green('安装完成'));
              })
            }
          })
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copy, pathName);
        }
      });
    });
  });
};


var exists = function (src, dst, callback, path) {
  fs.exists(dst, function (exists) {
    // 已存在
    if (exists) {
      callback(src, dst, path);
    }
    // 不存在
    else {
      fs.mkdir(dst, function () {
        callback(src, dst, path);
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
    const inn = execFile(getTemplate, [argv.cwd, nameOrPath]);
    inn.stdout.on('data', data => {
      console.log(data);
    })

    inn.stdout.on('close', (data) => {
      console.log(chalk.green('下载完成'));
    })
  } else {
    const pathName = argv.cwd + '/' + nameOrPath;
    const to = path.join(argv.cwd, nameOrPath);
    getFileCount(from);
    exists(from, to, copy, pathName);
  }
}


module.exports = init;