const fs = window.require('fs')

export function existsProjectFolder() {
  hasExists('./config/').then(exists => {
    if (!exists) fs.mkdirSync('./config/')
    console.info('exists:', exists)
  })
  getFileInfo('./config').then(data=>{
    console.info('get-file-info:', data () {
      return {
        
      }
    })
  })
  // fs.stat('./config', (error, stat) => {
  //   // if (!stat) fs.mkdirSync('./config/')
  //   if (error) {
  //     console.log(error)
  //   } else console.info('stat:', error, stat)
  // })
  // fs.stat('config/', stat => {
  //   if (stat && stat.isFile()) console.info('文件已存在')
  //   else console.info('文件不存在')
  //   console.info('stat:', stat)
  // })
}
function hasExists(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.exists(path, exists => resolve(exists))
    } catch (error) {
      reject(error)
    }
  })
}
function getFileInfo(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, data) => {
      if (error) reject({ msg: error })
      else resolve(data)
    })
  })
}