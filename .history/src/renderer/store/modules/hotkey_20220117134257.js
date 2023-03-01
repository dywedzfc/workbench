import _ from 'lodash'
import { macosAltHotkey } from 'util'
import router from '../../router'

const state = {
  key: '',
  iconKey: ''
}

const getters = {
  hotkeys: state => state.key,
  hotkeysIcon: state => state.iconKey
}

const mutations = {
  SET_HOTKEYS(state, key) {
    let hotkeys = state.key
    let iconKeys = state.iconKey
    let iconKey = ''
    const hotKey = macosAltHotkey()
    if (key == 'Meta') {
      key = 'Command'
      iconKey = '⌘'
    } else {
      if (key == 'Control') iconKey = '⌃'
      else if (key == 'Shift') iconKey = '⇧'
      else if (key == 'Alt') {
        // key = 'Option'
        iconKey = '⌥'
      } else if (hotkeys.indexOf('Alt') >= 0 && hotKey.altKey(key) == key) {
        iconKey = hotKey.key(key).toUpperCase()
      } else iconKey = key.toUpperCase()
    }
    hotkeys += !hotkeys ? key : `:${key}`
    iconKeys += !iconKeys ? iconKey : `:${iconKey}`
    const newkey = _.uniq(hotkeys.split(':')).join(':')
    const newIconkey = _.uniq(iconKeys.split(':')).join(':')
    if (state.key != newkey) state.key = newkey
    if (state.iconKey != newIconkey) state.iconKey = newIconkey
  },
  CLOSE_HOTKEYS(state, key) {
    const { path } = router.app._route
    switch (state.key) {
      case 'Command:1':
        if (path != '/') router.push('/')
        break
      case 'Command:2':
        if (path != '/daily') router.push('/daily')
        break
      case 'Command:3':
        if (path != '/monthly') router.push('/monthly')
        break
      case 'Command:4':
        if (path != '/jkzsl') router.push('/jkzsl/list')
        break
      case 'Command:5':
        if (path != '/hsz') router.push('/hsz')
        break
      case 'Command:6':
        if (path != '/about') router.push('/about')
        break
    }
    let hotkey = ''
    let iconKey = ''
    if (key) {
      const record = state.key.split(':')
      const index = record.indexOf(key)
      if (index >= 0) {
        const newIcon = state.iconKey.split(':')
        record.splice(index, 1)
        newIcon.splice(index, 1)
        hotkey = record.join(':')
        iconKey = newIcon.join(':')
      }
    }
    state.key = hotkey
    state.iconKey = iconKey
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
