const { Menu, MenuItem } = require('electron')

const menu = new Menu()

menu.append(
  new MenuItem({
    label: 'Print',
    accelerator: 'Ctrl+P',
    click: () => {
      console.log('打印资料')
    },
  })
)
