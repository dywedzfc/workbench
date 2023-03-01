import { reject } from 'core-js/fn/promise'
import { promises } from 'fs'

const fs = window.require('fs')

export function existsProjectFolder() {
  hasExists('./config/').then(value => {
    console.info(value)
  })
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
  return new promises((resolve, reject) => {
    try {
      fs.exists(path, exists => {
        resolve(exists)
      })
    } catch (error) {
      reject(error)
    }
  })
}
