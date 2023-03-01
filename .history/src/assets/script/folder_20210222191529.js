const fs = window.require('fs')

export function existsProjectFolder() {
  fs.exists('./config/', exists => {
    if (!exists) fs.mkdirSync('./config/')
    console.info('exists:', exists)
  })
  // fs.stat('config/', stat => {
  //   if (stat && stat.isFile()) console.info('文件已存在')
  //   else console.info('文件不存在')
  //   console.info('stat:', stat)
  // })
}
function hasExists(path) {
  fs.exists(path).then(exists => {
    console.info('has-exists:', exists)
  })
}
