const { promisify } = require('util')
// 清除命令行
const clear = require('clear')
// 装饰
const figlet = promisify(require('figlet'))
// 颜色
const chalk = require('chalk')
// 打印包装
const log = content => console.log(chalk.green(content))
const ora = require('ora')

const { spawn } = require('../utils')

module.exports = async ({ message, tag }) => {
  // clear()
  const data = await figlet('upload to git...')
  log(data)
  const process = ora()
  process.start('uploading...\r\n')
  await spawn('git', ['add', '.'], {cwd: ''})
  await spawn('git', ['commit', '-m', message], {cwd: ''})
  await spawn('git', ['push', 'origin', 'master'], {cwd: ''})
  if (tag) {
    await spawn('git', ['tag', tag], {cwd: ''})
    await spawn('git', ['push', 'origin', tag], {cwd: ''})
  }
  process.succeed('upload to git success...\r\n')
}