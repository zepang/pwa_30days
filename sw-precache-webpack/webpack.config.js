var path = require('path')

module.exports = {
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  output: {
    path: path.resolve(__dirname, './assets')
    filename: 'bundle.js'
  }
}