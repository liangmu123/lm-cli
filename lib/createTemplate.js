const fs = require('fs')
const path = require('path')
const { isFileExisted } = require('../utils')
const { VUE_EXT } = require('./constant')
// 颜色
const chalk = require('chalk')
const ejs = require('ejs')
const ora = require('ora')

module.exports = async (templateName, options) => {
  const process_ora = ora()
  process_ora.start('downloading...\r\n')
  let context = process.cwd()
  let absolutePath = ''
  if (options.path) {
    absolutePath = path.join(context, options.path, `${templateName}${VUE_EXT}`)
  } else {
    absolutePath = path.join(context, `${templateName}${VUE_EXT}`)
  }
  let res = await isFileExisted(absolutePath)
  if (res) {
    process_ora.fail(chalk.red(`file ${absolutePath} is existed`))
    return
  } else {
    let template = fs.readFileSync(path.resolve(__dirname, '../template/vue.ejs'), 'utf-8')
    let content = ejs.compile(template)({
      name: templateName
    })
    fs.writeFileSync(absolutePath, content, 'utf-8')
    process_ora.succeed('download success...\r\n')
  }
}