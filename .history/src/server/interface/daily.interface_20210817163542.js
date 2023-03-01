import _ from 'lodash'
import { getDailyFolder, getDailyFolderName, setDailyInfo } from '../folder/daily'
import { charLength } from '../../util/data'

const split = '|:|'

/* ******************** 日报 ******************** */
export function getDailyInfo(month) {
  return getDailyFolder(month)
}

export function addDailyInfo(data) {
  const { date } = data
  if (!data || date.length != 10 || date.split('-').length != 3)
    return { code: 400, msg: '文件名丢失' }
  const month = date.substring(0, 7)
  const list = getDailyFolder(month)
  const filterList = _.filter(list, item => item.date == data.date)
  const splitV = '|:|'
  const projectId = data.data.projectId
  if (list.length == 0 || filterList.length == 0) {
    if (!Array.isArray(data.data)) data.data = [data.data]
    list.push(data)
  } else {
    _.each(list, item => {
      if (item.date != data.date) return
      if (!_.map(item.data, 'projectId').includes(projectId)) item.data.push(data.data)
      else {
        _.each(item.data, idata => {
          idata.projectId == projectId && (idata.task += splitV + data.data.task)
        })
      }
    })
  }
  return setDailyInfo(list, month)
}

export function updDailyInfo(data, query) {
  if (query.date.length != 10 || query.date.split('-').length != 3)
    return { code: 400, msg: '文件名丢失' }
  const month = query.date.substring(0, 7)
  const list = getDailyFolder(month)
  const equal = data.projectId == query.projectId
  const dailyList = equal ? updateTask(data, query, list) : updateProject(data, query, list)
  return setDailyInfo(dailyList, month)
}
export function delDailyInfo(query) {
  if (query.date.length != 10 || query.date.split('-').length != 3)
    return { code: 400, msg: '文件名丢失' }
  const month = query.date.substring(0, 7)
  const list = getDailyFolder(month)
  const dailyList = _.map(list, item => {
    if (item.date != query.date) return item
    const reset = _.map(item.data, project => {
      if (project.projectId != query.projectId) return project
      return undefined
    })
    if (reset.length == 0) return undefined
    item.data = _.filter(reset)
    return item
  })
  return setDailyInfo(_.filter(dailyList), month)
}

// TODO 更新项目
function updateProject(data, query, list) {
  return _.map(list, item => {
    if (item.date != query.date) return item
    const projectIds = _.map(item.data, 'projectId')
    const to = _.indexOf(projectIds, data.projectId)
    const form = _.indexOf(projectIds, query.projectId)
    if (to == -1) item.data[form] = data
    else {
      if (to > form) item.data[to].task = `${data.task}|:|${item.data[to].task}`
      if (form > to) item.data[to].task = `${item.data[to].task}|:|${data.task}`
      item.data[form] = undefined
      item.data = _.filter(item.data)
    }
    return item
  })
}
// TODO 更新任务
function updateTask(data, query, list) {
  return _.map(list, item => {
    if (item.date != query.date) return item
    item.data = _.map(item.data, project => {
      if (project.projectId != query.projectId) return project
      return data
    })
    return item
  })
}

/* ******************** 月报 ******************** */
export function getMonthlyInfo(year) {
  // const modelText = '模块,添加,修改,删除,调整'.split(',')
  const folderName = getDailyFolderName(year)
  const projectList = _.map(folderName, month => getDailyFolder(month))
  const years = {}
  const monthly = {}
  _.each(projectList.flat(), projectItem => {
    const month = projectItem.date.substring(0, 7)
    if (!monthly[month]) monthly[month] = {}

    _.each(projectItem.data, item => {
      if (!years[item.projectId]) years[item.projectId] = []
      if (!monthly[month][item.projectId]) monthly[month][item.projectId] = []
      const task = _.filter(_.uniq(years[item.projectId].concat(item.task.split(split))))
      const taskM = _.filter(_.uniq(monthly[month][item.projectId].concat(item.task.split(split))))
      years[item.projectId] = task
      monthly[month][item.projectId] = taskM
    })
  })
  return { year: resetProject(years, true), month: monthlyData(monthly) }
}
// export function addMonthlyInfo(data, query) {
//   // const modelText = '模块,添加,修改,删除,调整'.split(',')
//   const folderName = getDailyFolderName(year)
//   const projectList = _.map(folderName, month => getDailyFolder(month))
//   const years = {}
//   const monthly = {}
//   _.each(projectList.flat(), projectItem => {
//     const month = projectItem.date.substring(0, 7)
//     if (!monthly[month]) monthly[month] = {}

//     _.each(projectItem.data, item => {
//       if (!years[item.projectId]) years[item.projectId] = []
//       if (!monthly[month][item.projectId]) monthly[month][item.projectId] = []
//       const task = _.filter(_.uniq(years[item.projectId].concat(item.task.split(split))))
//       const taskM = _.filter(_.uniq(monthly[month][item.projectId].concat(item.task.split(split))))
//       years[item.projectId] = task
//       monthly[month][item.projectId] = taskM
//     })
//   })
//   return { year: resetProject(years, true), month: monthlyData(monthly) }
// }

function taskItem(value) {
  return { value, length: charLength(value) }
}
function resetProject(data, flag = false) {
  return _.map(data, (item, name) => {
    const task = _.map(_.orderBy(_.map(item, taskItem), 'length', 'asc'), resetTaskItem)
    const taskData = { projectId: name, task: task } //.join(split) }
    if (flag) taskData.id = Date.now()
    return taskData
  })
}
function resetTaskItem(item) {
  return { ...item, check: true }
}
function monthlyData(data) {
  return _.map(data, (item, date) => ({ date, data: resetProject(item) }))
}
