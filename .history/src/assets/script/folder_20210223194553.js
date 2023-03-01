const fs = window.require('fs')

export function existsProjectFolder() {
  console.info('exists:', hasExists('./config/'))
  if (!hasExists('./config/')) fs.mkdirSync('./config/')
  console.info('accdess:', fs.accessSync('./config/project-config.json'))
  fs.access(path_way, err => {
    if (err) {
      reject(false) //"不存在"
    } else {
      resolve(true) //"存在"
    }
  })
  if (!fs.accessSync('./config/project-config.json'))
    fs.writeFile('./config/project-config.json', '{}', 'utf8', function(error) {
      if (error) {
        console.log(error)
        return false
      }
      console.log('写入成功')
    })

  // console.info(createFolder('./config/'))
  // hasExists().then(exists => {
  //   if (!exists) fs.mkdirSync('./config/')
  //   console.info('exists:', exists)
  // })
  getFileInfo('./config').then(data => {
    console.info('get-file-info:', data)
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
  return fs.existsSync(path)
  // return new Promise((resolve, reject) => {
  //   try {
  //     fs.exists(path, exists => resolve(exists))
  //   } catch (error) {
  //     reject(error)
  //   }
  // })
}
function getFileInfo(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, data) => {
      if (error) reject({ msg: error })
      else resolve(data)
    })
  })
}
function createFolder(fileName) {
  fs.mkdirSync(fileName)
}
// accessSync
