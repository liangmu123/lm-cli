const fs = require('fs')

function spawn (...args) {
  const { spawn } = require('child_process')
  return new Promise((resolve, reject) => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

function isFileExisted (path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

module.exports = {
  spawn,
  isFileExisted
}