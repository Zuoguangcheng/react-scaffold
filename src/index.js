import optimist from 'optimist'

var argv = optimist.argv

const commands = argv._;

let command = '';
try {
  command = require(`./command/${commands[0]}`);
} catch (e) {
  console.log('输入错误', e);
}

argv.cwd = process.cwd();
command(argv);