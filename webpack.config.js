module.exports = {
  entry: ['babel-polyfill', './src/sharingan.js'],
  output: {
    path: __dirname + '/chrome_extension',
    filename: 'sharingan.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('postcss-cssnext')()
    ]
  }
}
