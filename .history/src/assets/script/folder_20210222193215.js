// const fs = window.require('fs')
import fs from 'fs'

export function existsProjectFolder() {
  // hasExists('./config/').then(exists => {
  //   if (!exists) fs.mkdirSync('./config/')
  //   console.info('exists:', exists)
  // })
  fs.stat('./config', (error, stat) => {
    // if (!stat) fs.mkdirSync('./config/')
    if (error) {
      console.log(error)
    } else console.info('stat:', error, stat)
  })
  // fs.stat('config/', stat => {
  //   if (stat && stat.isFile()) console.info('文件已存在')
  //   else console.info('文件不存在')
  //   console.info('stat:', stat)
  // })
}
function hasExists(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.exists(path, exists => {
        resolve(exists)
      })
    } catch (error) {
      reject(error)
    }
  })
}
