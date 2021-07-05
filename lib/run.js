const { promisify } = require('util')
// 装饰
const figlet = promisify(require('figlet'))
// 颜色
const chalk = require('chalk')
// 打印包装
const log = content => console.log(chalk.green(content))
const async = require('async')
const ora = require('ora')
// const { spawn } = require('../utils')
const { CONFIG_FILE } = require('./constant')
const execCommand = require('../utils/exec')

const path = require('path')

module.exports = async (commandName, options) => {
  let context = process.cwd()
  let configFile = path.join(context, CONFIG_FILE)
  try {
    let config = require(configFile)
    if (config.command && config.command[commandName] && typeof config.command[commandName] === 'function') {
      let commandList = config.command[commandName](options.options)
      if (!(commandList && Array.isArray(commandList) && commandList.length)) {
        console.log(chalk.red('No executable command'))
        return
      }
      let seriesList = []
      commandList.forEach (async item => {
        seriesList.push(async () => {
          await execCommand(item)
        })
      })
      const data = await figlet('Start running...')
      log(data)
      const process = ora()
      process.start('runing...\r\n')
      async.series(seriesList, (err, result) => {
        if (err) {
          process.fail(err.toString())
          return
        }
        process.succeed('The command runs successfully...\r\n')
      })
    } else {
      console.log(chalk.red(`configFile don't have command`))
    }
  } catch (err) {
    console.log(err)
  }
}