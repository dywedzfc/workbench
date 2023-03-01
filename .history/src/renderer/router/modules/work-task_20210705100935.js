export default [
  {
    path: '/daily',
    name: '日报',
    component: () => import('views/work-task/daily/Index.vue')
  },
  {
    path: '/monthly',
    name: '月报',
    component: () => import('views/work-task/monthly/Index.vue')
  },
  {
    path: '/postTask',
    name: '发布任务',
    component: () => import('views/work-task/monthly/Index.vue')
  }
]
