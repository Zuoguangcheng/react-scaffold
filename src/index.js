const optimist = require('optimist')
const chalk = require('chalk');

var argv = optimist.argv
const commands = argv._;
var params = ['init', 'build', 'start'];

let enter = () => {
  if (commands.length <= 0) {
    console.log(chalk.red('请输入参数: init; build; start'));
    return false;
  } else if (!params.includes(commands[0])) {
    console.log(chalk.red('输入参数错误-请输入参数: init; build; start'));
    return false;
  }

  let command = '';
  try {
    command = require(`./command/${commands[0]}`);
  } catch (e) {
    console.log('输入错误', e);
  }

  argv.cwd = process.cwd();
  command(argv);
}

enter();