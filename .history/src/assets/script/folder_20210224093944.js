const fs = window.require('fs')

export function getProjectFolder() {
  const path = './config/'
  const fileName = 'project-config.json'
  let fileInfo = ''
  console.info('exists:', hasExists(path))
  if (!hasExists(path)) fs.mkdirSync(path)
  // console.info('accdess:', fs.accessSync(`${path}${fileName}`))
  fs.access(`${path}${fileName}`, err => {
    if (err) {
      //"不存在"
      fs.writeFile(`${path}${fileName}`, '{}', 'utf8', function(error) {
        if (error) return false
        console.log('写入成功')
      })
    }
    //"存在"
    fileInfo = fs.readFileSync(`${path}${fileName}`, 'utf8')
    console.info('open-file:', fileInfo)
    return JSON.parse(fileInfo)
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
export function setProjectFolder(data) {
  console.info('set:', data)
  const path = './config/'
  const fileName = 'project-config.json'
  fs.writeFile(`${path}${fileName}`, `{data:${JSON.stringify(data)}}`, 'utf8', function(error) {
    if (error) return false
    console.log('写入成功')
  })
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
