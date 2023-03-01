import { app, Menu } from 'electron'

const isMac = process.platform === 'darwin'
// const menu = new Menu()

export function initMenu() {
  const menuList = [
    {
      label: 'WorkBench',
      submenu: [
        {
          label: `关于 ${app.getName()}`,
          accelerator: 'CommandOrControl+/',
          click: () => this.handleInternalJumpClick('关于'),
        },
        { type: 'separator' },
        {
          label: '偏好设置',
          accelerator: 'CommandOrControl+,',
          click: () => this.handleInternalJumpClick('设置'),
        },
        { type: 'separator' },
        { label: '隐藏', role: 'hide' },
        { label: '隐藏其他应用', role: 'hideOthers' },
        { label: '显示全部', role: 'unhide' },
        { type: 'separator' },
        { label: '关闭窗口', role: 'close' },
        { label: `退出 ${app.getName()}`, role: 'quit' }, // accelerator: 'CmdOrCtrl+Q', click: () => (app.quit(), undefined),
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '重做', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        ...(isMac
          ? [
              { label: '粘贴并匹配样式', role: 'pasteAndMatchStyle' },
              { label: '删除', role: 'delete' },
              { label: '全选', role: 'selectAll' },
              { type: 'separator' },
              { label: '查找', accelerator: 'CmdOrCtrl+F' }, // submenu: [{ role: 'search' }],
              { label: '替换', accelerator: 'Command+R' },
            ]
          : [
              { label: '删除', role: 'delete' },
              { type: 'separator' },
              { label: '全选', role: 'selectAll' },
            ]),
      ],
    },
    {
      label: '工具',
      submenu: [
        { label: 'Toggle Developer Tools', role: 'toggledevtools' }, // accelerator: 'Option+CommandOrControl+I', click: () => this.handleDeveloperClick(),
      ],
    },
    {
      label: '视图',
      submenu: [
        { label: '刷新', role: 'reload' }, //  accelerator: 'CommandOrControl+R', click: this.handleReloadClick
        { label: '强制刷新', role: 'forceReload' },
        { type: 'separator' },
        { label: '实际大小', role: 'resetZoom' },
        { label: '放大', role: 'zoomIn' },
        { label: '缩小刷新', role: 'zoomOut' },
        { type: 'separator' },
        { label: '进入全屏幕', role: 'togglefullscreen' },
      ],
    },
    {
      label: '窗口',
      submenu: [
        {
          label: '模块',
          submenu: [
            {
              label: '引导页',
              accelerator: 'CmdOrCtrl+1',
              click: () => this.handleInternalJumpClick('Home'),
            },
            {
              label: '日报',
              accelerator: 'CmdOrCtrl+2',
              click: () => this.handleInternalJumpClick('日报'),
            },
            {
              label: '月报',
              accelerator: 'CmdOrCtrl+3',
              click: () => this.handleInternalJumpClick('月报'),
            },
            {
              label: '项目列表',
              accelerator: 'CmdOrCtrl+4',
              click: () => this.handleInternalJumpClick('项目列表'),
            },
            {
              label: '回收站',
              accelerator: 'CmdOrCtrl+D',
              click: () => this.handleInternalJumpClick('回收站'),
            },
          ],
        },
        { label: '最小化', role: 'minimize' },
        { label: '缩放', role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { label: '前置窗口', role: 'front' },
              { type: 'separator' },
              { role: 'window' },
            ]
          : [{ label: '退出', role: 'close' }]),
      ],
    },
    { label: '帮助', role: 'help', submenu: [] },
    //   submenu: [
    //     {
    //       label: 'Learn More',
    //       click: async () => {
    //         const { shell } = require('electron')
    //         await shell.openExternal('https://electronjs.org')
    //       },
    //     },
    //   ],
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuList))
}
