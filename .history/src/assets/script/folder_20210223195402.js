const fs = window.require('fs')

export function existsProjectFolder() {
  const path = './config/'
  const fileName = 'project-config.json'
  console.info('exists:', hasExists(path))
  if (!hasExists(path)) fs.mkdirSync(path)
  // console.info('accdess:', fs.accessSync(`${path}${fileName}`))
  fs.access(`${path}${fileName}`, err => {
    if (err) {
      //"不存在"
      fs.writeFile(`${path}${fileName}`, '{}', 'utf8', function(error) {
        if (error) {
          console.log(error)
          return false
        }
        console.log('写入成功')
      })
    } else {
      //"存在"
      console.info('open-file:', fs.readFileSync(`${path}${fileName}`, 'utf8'))
      // fs.readFile(`${path}${fileName}`, function(error, data) {
      //   if (error) {
      //     console.log(error)
      //     return false
      //   }
      //   //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      //   console.log(data.toString()) //读取出所有行的信息
      // })
    }
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
