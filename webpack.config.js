var webpack = require('webpack');

module.exports = {
  entry: './lib/index',
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  output: {
    filename: 'dist/ReactDnDMouseMoveBackend.min.js',
    libraryTarget: 'umd',
    library: 'ReactDnDMouseMoveBackend'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}
