export default [
  {
    path: '/jkzsl/list',
    name: '项目列表',
    component: () => import('views/interface-instance/project-list/Index.vue')
  },
  {
    path: '/jkzsl/list/edit',
    name: '编辑项目',
    component: () => import('views/interface-instance/project-list/Edit.vue')
  },
  {
    path: '/jkzsl/file',
    name: '项目文件',
    component: () => import('views/interface-instance/project-file/Index.vue')
  },
  {
    path: '/jkzsl/file/details',
    name: '编辑项目文件信息',
    component: () => import('views/interface-instance/project-file/Edit.vue')
  },
  {
    path: '/jkzsl/file/add',
    name: '编辑项目文件内容',
    component: () => import('views/interface-instance/project-file/FileEdit.vue')
  }，
  {
    path: '/jkzsl/file/edit',
    name: '编辑项目文件内容',
    component: () => import('views/interface-instance/project-file/FileEdit.vue')
  }
]
