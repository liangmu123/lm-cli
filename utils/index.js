const fs = require('fs')

function spawn (...args) {
  const { spawn } = require('child_process')
  return new Promise((resolve, reject) => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    // stdout 获取标准输出
    // proc.stdout.on('data', data => {
    //   console.log(`${data}`)
    // })
    // stderr 获取标准错误输出
    // proc.stderr.on('data', data => {
    //   reject(data)
    // })
    proc.on('error', (err) => {
      reject(err)
    })
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