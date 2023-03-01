import Vue from 'vue'
import VueRouter from 'vue-router'
import { WorkTask, InterfaceInstance, ElementUI, RecycleBin } from './modules'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const { ipcRenderer } = window.require('electron')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/setting',
    name: '设置',
    component: () => import('../views/manage/Config.vue'),
  },
  {
    path: '/about',
    name: '关于',
    component: () => import('../views/About.vue'),
  },
  ...WorkTask,
  ...InterfaceInstance,
  ...ElementUI,
  ...RecycleBin,
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  console.info('bafore-each:', to.path, from.path)
  if (to.path == from.path && to.name == from.name) return false
  next()
})

ipcRenderer.on('href', (event, pathName) => {
  if (pathName) router.push({ name: pathName })
})

export default router
