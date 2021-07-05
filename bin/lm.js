#!/usr/bin/env node
const { program } = require('commander')

program.version(require('../package').version)

program
  .command('run <commandName>')
  .option('-o, --options <options...>', 'custom options')
  .description('run script command')
  .action(require('../lib/run'))

program
  .command('git')
  .requiredOption('-m, --message <message>')
  .option('-t, --tag <tagName>')
  .description('upload to git')
  .action(require('../lib/runGit'))

program
  .command('deploy')
  .option('-o, --options <options...>', 'custom options')
  .description('Automated Deployment')
  .action(require('../lib/deploy'))

program
  .command('download <templateName>')
  .option('-p, --path <pathname>')
  .description('create a vue template')
  .action(require('../lib/createTemplate'))

program.parse(process.argv)