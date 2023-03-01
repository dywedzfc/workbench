import _ from 'lodash'

const key = Object.freeze([
  { key: '1', altKey: '¡' },
  { key: '2', altKey: '™' },
  { key: '3', altKey: '£' },
  { key: '4', altKey: '¢' },
  { key: '5', altKey: '∞' },
  { key: '6', altKey: '§' },
  { key: '7', altKey: '¶' },
  { key: '8', altKey: '•' },
  { key: '9', altKey: 'ª' },
  { key: '0', altKey: 'º' },
  { key: '-', altKey: '–' },
  { key: '=', altKey: '≠' },
  { key: 'q', altKey: 'œ' },
  { key: 'w', altKey: '∑' },
  { key: 'e', altKey: '´' },
  { key: 'r', altKey: '®' },
  { key: 't', altKey: '†' },
  { key: 'y', altKey: '¥' },
  { key: 'u', altKey: '¨' },
  { key: 'i', altKey: 'ˆ' },
  { key: 'o', altKey: 'ø' },
  { key: 'p', altKey: 'π' },
  { key: '[', altKey: '“' },
  { key: ']', altKey: '‘' },
  { key: '\\', altKey: '«' },
  { key: 'a', altKey: 'å' },
  { key: 's', altKey: 'ß' },
  { key: 'd', altKey: '∂' },
  { key: 'f', altKey: 'ƒ' },
  { key: 'g', altKey: '©' },
  { key: 'h', altKey: '˙' },
  { key: 'j', altKey: '∆' },
  { key: 'k', altKey: '˚' },
  { key: 'l', altKey: '¬' },
  { key: ';', altKey: '…' },
  { key: "'", altKey: 'æ' },
  { key: 'z', altKey: 'Ω' },
  { key: 'x', altKey: '≈' },
  { key: 'c', altKey: 'ç' },
  { key: 'v', altKey: '√' },
  { key: 'b', altKey: '∫' },
  { key: 'n', altKey: '˜' },
  { key: 'm', altKey: 'µ' },
  { key: ',', altKey: '≤' },
  { key: '.', altKey: '≥' },
  { key: '/', altKey: '÷' }
])
export function macosAltHotkey() {
  function filterKeyName(v) {
    return _.filter(key, item => item.key == v || item.altKey == v)
  }
  return {
    key(v) {
      const list = filterKeyName(v)
      if (list.length) return list[0].key
      return ''
    },
    altKey(v) {
      const list = filterKeyName(v)
      if (list.length) return list[0].key
      return ''
    }
  }
}
