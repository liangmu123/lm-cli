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
const path = require('path')
const client = require('scp2')

const { CONFIG_FILE } = require('./constant')

module.exports = async () => {
  let context = process.cwd()
  let configFile = path.join(context, CONFIG_FILE)
  try {
    let config = require(configFile)
    if (config.deploy) {
      let deployConfig = config.deploy
      const uploading = ora('start uploading files to the server...\n')
      uploading.start()
      client.scp(
        deployConfig.sourcePath,
        deployConfig.serverInfo,
        (err) => {
          uploading.stop()
          if (err) {
            console.log(err)
          } else {
            console.log(chalk.green('  Successful upload of files to server!\n'))
          }
        }
      )
    } else {
      console.log(chalk.red('configFile not deploy'))
    }
  } catch (err) {
    console.log(err)
  }
}