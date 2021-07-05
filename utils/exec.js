function execCommand (shell) {
  const { exec } = require('child_process')
  return new Promise((resolve, reject) => {
    exec(shell, (error, stdout, stderr) => {
      if (error) {
        reject(`执行出错: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}9999`)
      resolve()
    })
  })
}

module.exports = execCommand
