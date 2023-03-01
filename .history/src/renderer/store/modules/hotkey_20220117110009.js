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
    console.info('info:', state.key, key)
    switch (state.key) {
      case 'Command:1':
        router.push('/')
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
