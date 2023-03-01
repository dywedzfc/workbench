let files = require.context('.', false, /\.js$/)
let modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '').replace(/(-)/g, '_')] = files(key).default
})

export default modules
